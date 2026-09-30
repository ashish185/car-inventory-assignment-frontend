import { gql, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

/**
 * Landing page for the exercise. It doubles as a health check: if the list
 * below reports a car count, Apollo Client and the mock API are wired up
 * correctly and you can start building.
 *
 * Delete or repurpose this page once you begin.
 */

const HEALTH_CHECK = gql`
  query GetCars {
    cars {
      id
      model
    }
  }
`;

const required = [
  "Fetch and display the car list from the mock GraphQL API (GetCars).",
  "Serve a different image per breakpoint: mobile ≤639px, tablet 640–1023px, desktop ≥1024px.",
  "Present the list using Material UI, with loading, error and empty states handled.",
  "Add a form that creates a new car through the CreateCar mutation and updates the list.",
  "Add a search field that filters by model, and a sort control.",
  "Move the data-fetching logic into a custom hook, useCars().",
  "Write unit tests for the components and hooks you add.",
];

const optional = [
  "Filter server-side by passing variables to GetCars rather than filtering in the client.",
  "Add a year filter and combine all filters into a useCarFilters() hook.",
  "Debounce the search input.",
  "Add a detail route using the GetCar query.",
];

function ApiStatus() {
  const { data, loading, error } = useQuery(HEALTH_CHECK);

  if (loading) return <Alert severity="info">Checking the mock API…</Alert>;
  if (error)
    return (
      <Alert severity="error">
        The mock API did not respond: {error.message}. Try a hard refresh — the
        service worker registers on first load.
      </Alert>
    );

  return (
    <Alert severity="success">
      Mock API responding. {data.cars.length} cars available.
    </Alert>
  );
}

export function Brief() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={1} mb={3}>
        <Chip label="Take-home exercise" size="small" sx={{ alignSelf: "start" }} />
        <Typography variant="h4" component="h1">
          Car inventory
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: "60ch" }}>
          Build a small inventory UI on top of the mock GraphQL API in this
          repo. The API contract is in <code>docs/API.md</code>. Aim for roughly
          three to four hours — we would rather see a smaller scope done well
          than everything done roughly.
        </Typography>
      </Stack>

      <ApiStatus />

      <Box mt={4}>
        <Typography variant="h6" component="h2" gutterBottom>
          What to build
        </Typography>
        <List dense sx={{ listStyleType: "decimal", pl: 3 }}>
          {required.map((item) => (
            <ListItem key={item} sx={{ display: "list-item", pl: 0 }}>
              {item}
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          If you have time
        </Typography>
        <List dense sx={{ listStyleType: "disc", pl: 3 }}>
          {optional.map((item) => (
            <ListItem key={item} sx={{ display: "list-item", pl: 0 }}>
              {item}
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="text.secondary">
        Before you submit, run <code>npm run verify</code> and fill in{" "}
        <Link href="https://github.com" underline="hover">
          NOTES.md
        </Link>{" "}
        with your decisions and trade-offs. Full instructions are in the README.
      </Typography>
    </Container>
  );
}
