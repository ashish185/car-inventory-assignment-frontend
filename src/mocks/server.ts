import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * Node-side mock server, for integration tests that exercise the real Apollo
 * client against the mock API instead of mocking hooks.
 *
 * Usage in a test file:
 *   import { server } from "@/mocks/server";
 *   beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
 *   afterEach(() => { server.resetHandlers(); db.reset(); });
 *   afterAll(() => server.close());
 */
export const server = setupServer(...handlers);
