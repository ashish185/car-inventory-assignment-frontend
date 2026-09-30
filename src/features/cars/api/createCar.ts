import { gql } from "@apollo/client";
import type { Car, CreateCarInput } from "../types/car";

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
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

export type CreateCarData = { createCar: Car };
export type CreateCarVars = { input: CreateCarInput };
