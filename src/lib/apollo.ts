import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphqlUrl } from "@/lib/env";

export const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});
