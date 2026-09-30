import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";
import { apolloClient } from "@/lib/apollo";

const theme = createTheme({
  palette: {
    primary: { main: "#0b5cd5" },
    background: { default: "#f7f7f8" },
  },
  shape: { borderRadius: 8 },
});

/**
 * Wraps the app in its global providers. Add more here (error boundary,
 * feature flags, i18n) as needed.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </ApolloProvider>
);
