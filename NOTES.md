# Notes

## What I completed

- All 7 required items: cars list, responsive images, MUI UI with
  loading/error/empty states, create car form, search + sort, data
  fetching in `useCars()`, and tests.
- Bonus: server-side search filter, and new cars are added straight to
  the Apollo cache instead of refetching.

## What I left out

- No year filter, no detail page for a single car — kept it to what
  was asked.
- New cars get a placeholder image since the form doesn't collect
  per-breakpoint image URLs.

## A few decisions

- Sorting is done client-side since the API doesn't support it.
- Responsive images use plain `<picture>`/`<source>`, no JS needed.
- Tests are a mix: some unit tests, some integration tests using MSW
  for the API.

## If I had more time

- Debounce the search input.
- Test cases
- Combine search/year/sort into one filter hook.
- Add a car detail page.
- Support image uploads.
- Update all cached views when a car is created, not just the current one.

## Running it

`npm install && npm run dev` — no backend needed, MSW mocks the API.
