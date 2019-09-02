import { GraphQLServer } from "graphql-yoga";

// location
// bio

// Type Definitions(Schema)
const typeDefs = `
type Query{
    hello:String!
    name:String!
    location:String!
    bio:String!
}
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Phonekham";
    },
    location() {
      return "Vientiane";
    },
    bio() {
      return "Love cats";
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
