import { ApolloProvider } from "@apollo/client";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement, ReactNode } from "react";
import { apolloClient } from "@/lib/apollo";

/**
 * Renders a component inside the same providers the app uses.
 *
 * Pair this with `src/mocks/server.ts` when you want a test to exercise the
 * real Apollo client against the mock API. For unit tests of presentational
 * components, plain `render` from RTL is fine.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </ApolloProvider>
);

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
