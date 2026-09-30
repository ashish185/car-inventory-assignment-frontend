/**
 * Step 1 of the jsdom polyfills: text encoding and streams.
 *
 * These must be installed before `undici` is imported, which is why the
 * polyfills are split across two files in `setupFiles`.
 */
import { TextDecoder, TextEncoder } from "node:util";
import { ReadableStream, TransformStream } from "node:stream/web";
import { Blob, File } from "node:buffer";
import { BroadcastChannel } from "node:worker_threads";

const values: Record<string, unknown> = {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  TransformStream,
  Blob,
  File,
  BroadcastChannel,
};

for (const [key, value] of Object.entries(values)) {
  if (!(key in globalThis)) {
    Object.defineProperty(globalThis, key, {
      value,
      writable: true,
      configurable: true,
    });
  }
}
