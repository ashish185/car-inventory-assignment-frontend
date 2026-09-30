/**
 * Seed data for the mock API.
 *
 * Images are local SVGs under /public/images. Each breakpoint variant is
 * visually labelled ("mobile · 640×420") so the responsive-image requirement
 * can be verified at a glance, with no external network dependency.
 */
export type SeedCar = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

const image = (slug: string) => ({
  mobile: `/images/${slug}-mobile.svg`,
  tablet: `/images/${slug}-tablet.svg`,
  desktop: `/images/${slug}-desktop.svg`,
});

export const seedCars: SeedCar[] = [
  { id: "1", make: "Audi", model: "Q5", year: 2023, color: "Glacier White", ...image("q5") },
  { id: "2", make: "Audi", model: "A3", year: 2022, color: "Tango Red", ...image("a3") },
  { id: "3", make: "Audi", model: "R8", year: 2024, color: "Nardo Grey", ...image("r8") },
  { id: "4", make: "Audi", model: "e-tron GT", year: 2025, color: "Kemora Grey", ...image("etron") },
  { id: "5", make: "Audi", model: "A6", year: 2021, color: "Navarra Blue", ...image("a6") },
  { id: "6", make: "Audi", model: "Q3", year: 2024, color: "Mythos Black", ...image("q3") },
];
