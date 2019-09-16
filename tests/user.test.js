import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";

const client = new ApolloBoost({
  uri: "http://localhost:4000"
});

beforeEach(async () => {
  jest.setTimeout(780000);
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "phonekham",
      email: "email@gmail.com",
      password: bcrypt.hashSync("Phone@1234")
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My published post",
      body: "",
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "My draft post",
      body: "",
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  });
});

test("Should create a new user", async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: { name: "Phone", email: "pghff@gmail.com", password: "12345678" }
      ) {
        user {
          id
        }
        token
      }
    }
  `;
  const response = await client.mutate({
    mutation: createUser
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(exists).toBe(true);
});

test("Should expose public author profile", async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;
  const response = await client.query({ query: getUsers });
  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("phonekham");
});

test("Should expose published posts", async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;
  const response = await client.query({ query: getPosts });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});
