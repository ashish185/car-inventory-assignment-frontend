export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export type CreateCarInput = {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

export type SortField = "make" | "model" | "year";
export type SortDirection = "asc" | "desc";
