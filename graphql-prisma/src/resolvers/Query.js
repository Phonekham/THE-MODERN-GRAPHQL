const Query = {
  users(parent, args, { db, prisma }, info) {
    return prisma.query.users(null, info);
    // if (!args.query) {
    //   return db.users;
    // }
    // return db.users.filter(user => {
    //   return user.name.toLowerCase().includes(args.query.toLowerCase());
    // });
  },
  posts(parent, args, { db, prisma }, info) {
    return prisma.query.posts(null, info);
    // if (!args.query) {
    //   return db.posts;
    // }
    // return db.posts.filter(post => {
    //   const isTitleMatch = post.title
    //     .toLowerCase()
    //     .includes(args.query.toLowerCase());
    //   const isBodyMatch = post.body
    //     .toLowerCase()
    //     .includes(args.query.toLowerCase());
    //   return isTitleMatch || isBodyMatch;
    // });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
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
