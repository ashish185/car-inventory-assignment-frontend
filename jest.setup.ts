import "@testing-library/jest-dom";

// jsdom does not implement matchMedia; MUI's useMediaQuery needs it.
// Candidates can override the return value per-test if they assert on breakpoints.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
