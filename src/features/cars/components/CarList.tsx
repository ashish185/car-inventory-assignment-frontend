import { Alert, Grid, Skeleton } from "@mui/material";
import type { ApolloError } from "@apollo/client";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Car } from "../types/car";
import { CarCard } from "./CarCard";

type CarListProps = {
  cars: Car[];
  loading: boolean;
  error?: ApolloError;
};

export function CarList({ cars, loading, error }: CarListProps) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((key) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height={220} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Alert severity="error">Could not load cars: {error.message}</Alert>;
  }

  if (cars.length === 0) {
    return (
      <EmptyState
        title="No cars found"
        description="Try a different search term, or add a new car below."
      />
    );
  }

  return (
    <Grid container spacing={2}>
      {cars.map((car) => (
        <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
}
