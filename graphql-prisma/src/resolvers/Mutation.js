import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const dummy = async () => {
  const email = "phone@gmail.com";
  const password = "pass1234";
  const hashedPassword =
    "$2a$10$S3Jj8JDbHOpq8xhFPxska.ZYTJkYaGRZDoOGbkPUVGdvrn94LAcXq";
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};
dummy();

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("PAssword must be 8 charactors or longer");
    }
    const password = await bcrypt.hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });
    return { user, token: jwt.sign({ userId: user.id }, "mySecret") };
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return {
      user,
      token: jwt.sign({ userId: user.id }, "mySecret")
    };
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) {
      throw new Error("User not found");
    }
    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  },
  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  }
};

export { Mutation as default };
