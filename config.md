# Config

## Mock Service Worker (MSW)

MSW is used in two separate places:

1. **Browser (app runtime)** — [src/mocks/browser.ts](src/mocks/browser.ts) sets up `setupWorker(...handlers)` using [src/mocks/handlers.ts](src/mocks/handlers.ts). It's started from [src/main.tsx](src/main.tsx) via `enableMocking()`, which registers the service worker at `/mockServiceWorker.js` ([public/mockServiceWorker.js](public/mockServiceWorker.js)).

   `enableMocking()` is gated behind `import.meta.env.DEV`, so it only runs during `npm run dev` and is skipped in production builds.

2. **Node (tests)** — [src/mocks/server.ts](src/mocks/server.ts) sets up `setupServer(...handlers)` (msw/node) and is wired into Jest lifecycle hooks per test file (`server.listen()` / `server.resetHandlers()` / `server.close()`), e.g. [src/features/cars/hooks/useCars.test.tsx](src/features/cars/hooks/useCars.test.tsx).

### Stopping MSW

- **In dev:** remove/comment out the `enableMocking()` call in [src/main.tsx](src/main.tsx), or unregister the service worker from the browser's DevTools Application tab.
- **In production builds:** already disabled by the `import.meta.env.DEV` check.
- **In tests:** remove the `server.listen()/resetHandlers()/close()` calls from the relevant test file.
