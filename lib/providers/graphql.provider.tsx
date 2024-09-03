"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { FCC } from "@/lib/types/tools.types";

interface GraphQLProviderProps {
  accessToken?: string;
}

const GraphQLProvider: FCC<GraphQLProviderProps> = ({
  children,
  accessToken,
}) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
    headers
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
