import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import type { CreateCarInput } from "../types/car";

type CarFormProps = {
  onSubmit: (input: CreateCarInput) => Promise<unknown>;
  submitting: boolean;
  serverError?: string;
};

const emptyForm = { make: "", model: "", year: "", color: "" };

export function CarForm({ onSubmit, submitting, serverError }: CarFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setValidationError(null);

    if (!form.make.trim() || !form.model.trim() || !form.color.trim() || !form.year.trim()) {
      setValidationError("Make, model, year and color are all required.");
      return;
    }

    const year = Number(form.year);
    if (!Number.isInteger(year)) {
      setValidationError("Year must be a whole number.");
      return;
    }

    await onSubmit({
      make: form.make.trim(),
      model: form.model.trim(),
      year,
      color: form.color.trim(),
      // no image upload in the form, just use a placeholder for now
      mobile: "/vite.svg",
      tablet: "/vite.svg",
      desktop: "/vite.svg",
    });
    setForm(emptyForm);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} noValidate>
      {(validationError || serverError) && (
        <Alert severity="error">{validationError ?? serverError}</Alert>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Make"
          value={form.make}
          onChange={handleChange("make")}
          size="small"
          fullWidth
        />
        <TextField
          label="Model"
          value={form.model}
          onChange={handleChange("model")}
          size="small"
          fullWidth
        />
        <TextField
          label="Year"
          value={form.year}
          onChange={handleChange("year")}
          size="small"
          fullWidth
        />
        <TextField
          label="Color"
          value={form.color}
          onChange={handleChange("color")}
          size="small"
          fullWidth
        />
      </Stack>
      <Button type="submit" variant="contained" disabled={submitting} sx={{ alignSelf: "start" }}>
        {submitting ? "Adding…" : "Add car"}
      </Button>
    </Stack>
  );
}
