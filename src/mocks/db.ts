import { seedCars, type SeedCar } from "./seed";

/**
 * In-memory store backing the mock API.
 *
 * Kept separate from the request handlers so tests can reset state between
 * cases without reaching into handler internals.
 */
let cars: SeedCar[] = [...seedCars];

export const db = {
  list: () => [...cars],
  insert: (car: SeedCar) => {
    cars = [...cars, car];
    return car;
  },
  reset: () => {
    cars = [...seedCars];
  },
};
