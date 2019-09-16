import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
import bcrypt from "bcryptjs";
import prisma from "../src/prisma";

const client = new ApolloBoost({
  uri: "http://localhost:4000"
});

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const user = await prisma.mutation.createUser({
    data: {
      name: "name",
      email: "email@gmail.com",
      password: bcrypt.hashSync("Phone@1234")
    }
  });
  await prisma.mutation.createPost({
    data: {
      title: "my title",
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
