import { GraphQLServer } from "graphql-yoga";

// location
// bio

// Type Definitions(Schema)
const typeDefs = `
type Query{
    greeting(name:String, position:String):String!
    me:User!
    post: Post
}
type User{
    id: ID!
    name:String!
    email:String!
    age:Int!
}
type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}
`;
// Resolvers
const resolvers = {
  Query: {
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
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("server is up");
});
