import { useMutation } from "@apollo/client";
import {
  CREATE_CAR,
  type CreateCarData,
  type CreateCarVars,
} from "../api/createCar";
import { GET_CARS, type GetCarsData, type GetCarsVars } from "../api/getCars";
import type { CreateCarInput } from "../types/car";

/**
 * Creates a car and appends it to the currently active GET_CARS cache entry
 * (matched by `model`) instead of refetching.
 */
export function useCreateCar(currentModel: string | undefined) {
  const [createCar, { loading, error }] = useMutation<
    CreateCarData,
    CreateCarVars
  >(CREATE_CAR, {
    update(cache, { data }) {
      if (!data) return;
      const variables: GetCarsVars = { model: currentModel || undefined };
      cache.updateQuery<GetCarsData, GetCarsVars>(
        { query: GET_CARS, variables },
        (existing) =>
          existing ? { cars: [...existing.cars, data.createCar] } : existing
      );
    },
  });

  const submit = (input: CreateCarInput) => createCar({ variables: { input } });

  return { createCar: submit, loading, error };
}
