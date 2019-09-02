import { GraphQLServer } from "graphql-yoga";

// location
// bio

// Type Definitions(Schema)
const typeDefs = `
type Query{
    title: String! 
    price: Float!   
    releaseYear: Int  
    rating: Float   
    inStock: Boolean! 
}
`;
// Resolvers
const resolvers = {
  Query: {
    title() {
      return "The War of Art";
    },
    price() {
      return 12.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 5;
    },
    inStock() {
      return true;
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
