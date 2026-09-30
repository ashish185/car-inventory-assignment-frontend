import { render, screen } from "@testing-library/react";
import { db } from "@/mocks/db";
import { seedCars } from "@/mocks/seed";

/**
 * Proves the toolchain works: TypeScript, Jest, jsdom, RTL and the `@/` alias
 * all resolve. Delete this file once you have real tests.
 */
describe("toolchain", () => {
  it("renders a component with React Testing Library", () => {
    render(<h1>ready</h1>);
    expect(screen.getByRole("heading", { name: "ready" })).toBeInTheDocument();
  });

  it("exposes seed data through the mock db", () => {
    db.reset();
    expect(db.list()).toHaveLength(seedCars.length);
  });
});
