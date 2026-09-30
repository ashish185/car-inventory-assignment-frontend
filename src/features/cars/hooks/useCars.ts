import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import type { Car, SortDirection, SortField } from "../types/car";
import { GET_CARS, type GetCarsData, type GetCarsVars } from "../api/getCars";

type UseCarsOptions = {
  model?: string;
  sortBy?: SortField;
  direction?: SortDirection;
};

function sortCars(cars: Car[], sortBy: SortField, direction: SortDirection) {
  const sorted = [...cars].sort((a, b) => {
    const left = a[sortBy];
    const right = b[sortBy];
    if (typeof left === "number" && typeof right === "number") {
      return left - right;
    }
    return String(left).localeCompare(String(right));
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

// server filters by model, sorting is done here since the API doesn't support it
export function useCars({
  model,
  sortBy = "make",
  direction = "asc",
}: UseCarsOptions = {}) {
  const { data, loading, error, refetch } = useQuery<GetCarsData, GetCarsVars>(
    GET_CARS,
    { variables: { model: model || undefined } }
  );

  const cars = useMemo(
    () => sortCars(data?.cars ?? [], sortBy, direction),
    [data, sortBy, direction]
  );

  return { cars, loading, error, refetch };
}
