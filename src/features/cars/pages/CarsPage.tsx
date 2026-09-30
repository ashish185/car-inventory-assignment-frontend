import { useState } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { useCars } from "../hooks/useCars";
import { useCreateCar } from "../hooks/useCreateCar";
import { CarFilters } from "../components/CarFilters";
import { CarForm } from "../components/CarForm";
import { CarList } from "../components/CarList";
import type { SortDirection, SortField } from "../types/car";

export function CarsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("make");
  const [direction, setDirection] = useState<SortDirection>("asc");

  const { cars, loading, error } = useCars({
    model: search,
    sortBy,
    direction,
  });
  const { createCar, loading: creating, error: createError } =
    useCreateCar(search);

  const handleSortChange = (field: SortField, dir: SortDirection) => {
    setSortBy(field);
    setDirection(dir);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" component="h1">
          Car inventory
        </Typography>
        <Typography color="text.secondary">
          Browse the current inventory, search by model, or add a new car.
        </Typography>
      </Stack>

      <CarFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        direction={direction}
        onSortChange={handleSortChange}
      />

      <Stack sx={{ my: 3 }}>
        <CarList cars={cars} loading={loading} error={error} />
      </Stack>


      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" component="h2" gutterBottom>
        Add a car
      </Typography>
      <CarForm
        onSubmit={createCar}
        submitting={creating}
        serverError={createError?.message}
      />
    </Container>
  );
}
