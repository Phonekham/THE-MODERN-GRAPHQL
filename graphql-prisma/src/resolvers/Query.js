const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { db, prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  greeting(parent, args, { db }, info) {
    console.log(args);
    if (args.name && args.position) {
      return `Hello ${args.name} you are ${args.position}`;
    } else {
      return "Hello";
    }
  },
  me() {
    return {
      id: "1212",
      name: "Phone",
      email: "phone@gmail.com",
      age: 24
    };
  },
  post() {
    return {
      id: "123",
      title: "graph",
      body: "test",
      published: false
    };
  }
};

export { Query as default };
