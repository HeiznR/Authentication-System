import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

interface IApolloAppProvider {
  children: React.ReactNode;
}
const ApolloAppProvider = ({ children }: IApolloAppProvider) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;
