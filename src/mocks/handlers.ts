import { graphql, HttpResponse, delay } from "msw";
import { db } from "./db";
import type { SeedCar } from "./seed";

/**
 * Mock GraphQL API.
 *
 * This is the "backend" for the exercise — treat it as a service you do not
 * own. The contract is documented in docs/schema.graphql and docs/API.md.
 *
 * You should not need to edit this file to complete the required tasks. If you
 * do change it, say why in NOTES.md.
 */

const LATENCY_MS = 300;

type CarFilterArgs = {
  make?: string | null;
  model?: string | null;
  year?: number | null;
  color?: string | null;
};

const matches = (car: SeedCar, args: CarFilterArgs) => {
  const contains = (value: string, term?: string | null) =>
    !term?.trim() || value.toLowerCase().includes(term.trim().toLowerCase());

  return (
    contains(car.make, args.make) &&
    contains(car.model, args.model) &&
    contains(car.color, args.color) &&
    (args.year == null || car.year === Number(args.year))
  );
};

export const handlers = [
  graphql.query("GetCars", async ({ variables }) => {
    await delay(LATENCY_MS);
    const args = variables as CarFilterArgs;
    return HttpResponse.json({
      data: { cars: db.list().filter((car) => matches(car, args)) },
    });
  }),

  graphql.query("GetCar", async ({ variables }) => {
    await delay(LATENCY_MS);
    const car = db.list().find((item) => item.id === variables.id) ?? null;
    return HttpResponse.json({ data: { car } });
  }),

  graphql.mutation("CreateCar", async ({ variables }) => {
    await delay(LATENCY_MS);
    const input = variables.input as Omit<SeedCar, "id">;

    if (!input?.make?.trim() || !input?.model?.trim()) {
      return HttpResponse.json({
        errors: [
          {
            message: "make and model are required",
            extensions: { code: "BAD_USER_INPUT" },
          },
        ],
      });
    }

    const created = db.insert({
      ...input,
      year: Number(input.year),
      id: crypto.randomUUID(),
    });

    return HttpResponse.json({ data: { createCar: created } });
  }),
];
