# Mock GraphQL API

Everything is served by [MSW](https://mswjs.io) from `src/mocks/`. Requests to
`/graphql` are intercepted by a service worker in the browser, and by
`msw/node` in tests. There is no server process to start.

Responses are delayed by 300ms so loading states are actually visible. Created
records live in memory and reset on page reload.

The schema is in [`schema.graphql`](schema.graphql).

## Queries

### `cars(make, model, year, color): [Car!]!`

All arguments are optional. Strings are case-insensitive substring matches;
`year` is an exact match. With no arguments it returns everything.

```graphql
query GetCars($model: String, $year: Int) {
  cars(model: $model, year: $year) {
    id
    make
    model
    year
    color
    mobile
    tablet
    desktop
  }
}
```

The operation must be named `GetCars` — MSW matches handlers on operation name,
not on the shape of the document.

### `car(id: ID!): Car`

Returns `null` for an unknown id. Operation name: `GetCar`.

## Mutations

### `createCar(input: CreateCarInput!): Car!`

Operation name: `CreateCar`.

```graphql
mutation CreateCar($input: CreateCarInput!) {
  createCar(input: $input) {
    id
    make
    model
    year
    color
    mobile
    tablet
    desktop
  }
}
```

`make` and `model` must be non-blank; anything else returns a GraphQL error
with `extensions.code = "BAD_USER_INPUT"`. Image URLs are optional. The server
assigns `id`.

The new record will not appear in an existing `GetCars` result automatically —
deciding how to reconcile that (refetch, cache update, or something else) is
part of the exercise.

## Images

Each car carries three URLs pointing at local SVGs in `public/images/`. They
are labelled with their breakpoint and pixel dimensions, so you can confirm at
a glance which one the browser picked.

| Field | Intended viewport | Asset size |
| --- | --- | --- |
| `mobile` | ≤ 639px | 640×420 |
| `tablet` | 640–1023px | 1024×576 |
| `desktop` | ≥ 1024px | 1600×800 |

## Testing against the API

`src/test/example.integration.test.tsx` shows the pattern: start
`src/mocks/server.ts`, render through `renderWithProviders`, and let the real
Apollo client talk to the mock API. Call `db.reset()` between tests if a case
creates records.

To force an error path, override a handler for a single test:

```ts
import { graphql, HttpResponse } from "msw";
import { server } from "@/mocks/server";

server.use(
  graphql.query("GetCars", () =>
    HttpResponse.json({ errors: [{ message: "boom" }] })
  )
);
```
