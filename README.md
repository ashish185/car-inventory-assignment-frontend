# Car inventory — take-home exercise

Thanks for making time for this. The goal is to see how you structure a small
React application against a GraphQL API: how you organise code, where you put
state, how you handle the unhappy paths, and what you choose to test.

**Time:** aim for three to four hours. We would rather see a narrower scope
built well than the full list built roughly. If you run out of time, stop and
write down what you would have done next.

---

## Getting started

Requires Node 20 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev
```

Open http://localhost:3000. If the banner says the mock API is responding, you
are ready to start. On first load the service worker registers, so a hard
refresh is occasionally needed.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000 |
| `npm test` | Jest + React Testing Library |
| `npm run test:watch` | Tests in watch mode |
| `npm run lint` | ESLint, zero warnings allowed |
| `npm run typecheck` | TypeScript, no emit |
| `npm run verify` | Lint, typecheck, test and build — run this before you submit |

## The API

There is no server process. The GraphQL API is mocked in the browser with
[MSW](https://mswjs.io), which intercepts requests to `/graphql`. It behaves
like a real endpoint: it is asynchronous, it can return errors, and created
records persist until you reload the page.

The contract is in [`docs/API.md`](docs/API.md) and
[`docs/schema.graphql`](docs/schema.graphql). Treat it as a service owned by
another team — you should not need to modify `src/mocks/` to complete the
required work. If you do change it, say why in `NOTES.md`.

## What to build

1. **List the cars.** Fetch them from the `GetCars` query and display them.
2. **Responsive images.** Each car has three image URLs. Serve `mobile` at
   ≤639px, `tablet` at 640–1023px, and `desktop` at ≥1024px. The placeholder
   images are labelled with their breakpoint so this is easy to verify.
3. **Material UI.** Use MUI for the presentation, including loading, error and
   empty states.
4. **Create a car.** A form that submits through the `CreateCar` mutation, with
   the list reflecting the new record afterwards. Handle validation failure —
   the API rejects a blank make or model.
5. **Search and sort.** Filter by model and offer at least one sort order.
6. **A `useCars()` hook.** Data fetching should not live in your components.
7. **Tests.** Cover the components and hooks you add. Both a unit example and an
   integration example against the mock API are in `src/test/` — delete them
   once you have your own.

### If you have time

- Filter server-side by passing variables to `GetCars` instead of filtering in
  the client.
- Add a year filter and combine the filters into a `useCarFilters()` hook.
- Debounce the search input.
- Add a detail route using the `GetCar` query.
- Accessibility: keyboard operation, labelled controls, sensible landmarks.

## Where code goes

The structure follows [bulletproof-react](https://github.com/alan2207/bulletproof-react).
It is a suggestion — use something else if you can explain why.

```
src/
├── app/           # Providers and routing
├── features/      # Feature-scoped code — your work goes in features/cars/
├── components/ui/ # Shared, feature-agnostic components
├── hooks/         # Shared hooks
├── lib/           # Third-party client setup (Apollo)
├── mocks/         # The mock API — treat as read-only
├── pages/         # Route-level components
└── test/          # Test helpers and examples
```

`@/` is aliased to `src/` in both Vite and Jest.

## What we are looking at

- **Structure** — can someone else find things, and does the boundary between
  shared and feature code hold up?
- **Data layer** — sensible use of Apollo, cache updates after mutation, no
  fetching logic stranded in components.
- **States** — loading, error, empty and validation-failure all handled.
- **Types** — TypeScript used to express intent rather than satisfy the
  compiler. `any` is a smell.
- **Tests** — do they test behaviour a user cares about, and would they catch a
  regression?
- **Judgement** — what you chose to leave out, and whether you said so.

We are not looking for pixel-perfect visual design, extra libraries, or an
exhaustive feature list.

## Submitting

1. Run `npm run verify` and make sure it passes.
2. Fill in [`NOTES.md`](NOTES.md). This carries real weight — it is where you
   explain trade-offs the code cannot.
3. Push to a repository you own and share the link, or send a zip of the repo
   without `node_modules`.

Questions or anything ambiguous in the brief: ask. Noticing an ambiguity and
raising it is a positive signal, not a negative one.
