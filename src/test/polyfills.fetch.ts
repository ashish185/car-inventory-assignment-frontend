/**
 * Step 2 of the jsdom polyfills: the fetch family.
 *
 * jsdom either omits these or provides versions MSW cannot intercept, so they
 * are replaced unconditionally with undici's implementations.
 *
 * If a new test fails with "fetch is not defined" or requests escape the mock
 * API, the cause is here rather than in your code.
 */
import { fetch, FormData, Headers, Request, Response } from "undici";

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true, configurable: true },
  Headers: { value: Headers, writable: true, configurable: true },
  Request: { value: Request, writable: true, configurable: true },
  Response: { value: Response, writable: true, configurable: true },
  FormData: { value: FormData, writable: true, configurable: true },
});
