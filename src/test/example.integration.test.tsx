import { gql, useQuery } from "@apollo/client";
import { renderWithProviders, screen, waitFor } from "./renderWithProviders";
import { server } from "@/mocks/server";
import { db } from "@/mocks/db";

/**
 * Example of testing against the mock API rather than mocking the hook.
 * Use this pattern when you want to cover the query, the cache and the
 * component together. Delete it once you have your own.
 */

const GET_CARS = gql`
  query GetCars {
    cars {
      id
      model
    }
  }
`;

function CarCount() {
  const { data, loading } = useQuery(GET_CARS);
  if (loading) return <p>Loading…</p>;
  return <p>{data.cars.length} cars</p>;
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  db.reset();
});
afterAll(() => server.close());

describe("mock API integration", () => {
  it("renders data returned by the mock GraphQL API", async () => {
    renderWithProviders(<CarCount />);
    await waitFor(() => expect(screen.getByText("6 cars")).toBeInTheDocument());
  });
});
