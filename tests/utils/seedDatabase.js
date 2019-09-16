import bcrypt from "bcryptjs";
import prisma from "../../src/prisma";

const seedDatabase = async () => {
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
};

export { seedDatabase as default };
