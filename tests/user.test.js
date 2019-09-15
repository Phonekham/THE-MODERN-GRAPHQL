import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";

const client = new ApolloBoost({
  uri: "http://locahost:4000"
});

test("Should create a new user", async () => {
  const createUser = gql`
  mutatiion{
    createUser(
      data:{
        name:"Phone",
        email:"ph@gmail.com".
        password:"pasw1234"){
      token,
      user{
        id
      }
      }
    }
  }
  `;
  const response = client.mutate({
    mutation: createUser
  });
});
