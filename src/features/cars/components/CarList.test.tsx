import { render, screen } from "@testing-library/react";
import { ApolloError } from "@apollo/client";
import { CarList } from "./CarList";
import type { Car } from "../types/car";

const car: Car = {
  id: "1",
  make: "Audi",
  model: "Q5",
  year: 2023,
  color: "Glacier White",
  mobile: "/images/q5-mobile.svg",
  tablet: "/images/q5-tablet.svg",
  desktop: "/images/q5-desktop.svg",
};

describe("CarList", () => {
  it("shows a loading state", () => {
    const { container } = render(<CarList cars={[]} loading />);
    expect(container.querySelectorAll(".MuiSkeleton-root").length).toBeGreaterThan(0);
  });

  it("shows an error state", () => {
    render(
      <CarList cars={[]} loading={false} error={new ApolloError({ errorMessage: "boom" })} />
    );
    expect(screen.getByText(/could not load cars/i)).toBeInTheDocument();
  });

  it("shows an empty state when there are no cars", () => {
    render(<CarList cars={[]} loading={false} />);
    expect(screen.getByText("No cars found")).toBeInTheDocument();
  });

  it("renders a card per car", () => {
    render(<CarList cars={[car]} loading={false} />);
    expect(screen.getByText("Audi Q5")).toBeInTheDocument();
  });
});
