import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { Car } from "../types/car";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  return (
    <Card variant="outlined" data-testid="car-card">
      <picture>
        <source media="(min-width: 1024px)" srcSet={car.desktop} />
        <source media="(min-width: 640px)" srcSet={car.tablet} />
        <img
          src={car.mobile}
          alt={`${car.make} ${car.model}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </picture>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <div>
            <Typography variant="subtitle1" component="h3">
              {car.make} {car.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.year} · {car.color}
            </Typography>
          </div>
          <Chip label={car.year} size="small" />
        </Stack>
      </CardContent>
    </Card>
  );
}
