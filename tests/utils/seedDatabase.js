import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const userOne = {
  input: {
    name: "phonekham",
    email: "email@gmail.com",
    password: bcrypt.hashSync("Phone@1234")
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: "Jeff",
    email: "jeff@example.com",
    password: bcrypt.hashSync("PassForJeff")
  },
  user: undefined,
  jwt: undefined
};

const postOne = {
  input: { title: "My published post", body: "", published: true },
  output: undefined
};
const postTwo = {
  input: {
    title: "My draft post",
    body: "",
    published: false
  },
  post: undefined
};

const seedDatabase = async () => {
  jest.setTimeout(780000);
  // Delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // Create User One
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
  // create post 1
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
  // create post 2
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  // Create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userTwo.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });

  // Create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });
};

export {
  seedDatabase as default,
  userOne,
  postOne,
  postTwo,
  userTwo,
  commentOne,
  commentTwo
};
