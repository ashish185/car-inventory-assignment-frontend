import { gql } from "@apollo/client";
import type { Car } from "../types/car";

export const GET_CARS = gql`
  query GetCars($model: String) {
    cars(model: $model) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export type GetCarsData = { cars: Car[] };
export type GetCarsVars = { model?: string };
