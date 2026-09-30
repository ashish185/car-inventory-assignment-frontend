const backendPort = import.meta.env.VITE_BACKEND_PORT ?? "4000";

export const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? `http://localhost:${backendPort}/graphql`;
