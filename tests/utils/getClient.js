const getClient = () => {
  const client = new ApolloBoost({
    uri: "http://localhost:4000"
  });
};

export { getClient as default };
