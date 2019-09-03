import { GraphQLServer } from "graphql-yoga";

// demo user data
const users = [
  {
    id: "1",
    name: "Phone",
    email: "phone@gmail.com",
    age: 24
  },
  {
    id: "2",
    name: "love",
    email: "love@gmail.com",
    age: 24
  }
];

// demo post data
const posts = [
  {
    id: "1",
    title: "Phone",
    body: "love@gmail.com",
    published: true,
    author: "2"
  },
  {
    id: "2",
    title: "love",
    body: "love@gmail.com",
    published: true,
    author: "2"
  }
];

// Type Definitions(Schema)
const typeDefs = `
type Query{
    greeting(name:String, position:String):String!
    me:User!
    post: Post
    users(query: String): [User!]!
    posts(query: String):[Post!]!
}
type User{
    id: ID!
    name:String!
    email:String!
    age:Int!
    posts:[Post!]!
}
type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author:User!
}
`;
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    greeting(parent, args, ctx, info) {
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("server is up");
});
