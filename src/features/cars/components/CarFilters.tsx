import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import type { SortDirection, SortField } from "../types/car";

type CarFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortField;
  direction: SortDirection;
  onSortChange: (sortBy: SortField, direction: SortDirection) => void;
};

const SORT_OPTIONS = [
  { value: "make-asc", label: "Make (A–Z)" },
  { value: "make-desc", label: "Make (Z–A)" },
  { value: "model-asc", label: "Model (A–Z)" },
  { value: "model-desc", label: "Model (Z–A)" },
  { value: "year-asc", label: "Year (oldest first)" },
  { value: "year-desc", label: "Year (newest first)" },
];

export function CarFilters({
  search,
  onSearchChange,
  sortBy,
  direction,
  onSortChange,
}: CarFiltersProps) {
  const handleSortChange = (event: SelectChangeEvent) => {
    const [field, dir] = event.target.value.split("-") as [SortField, SortDirection];
    onSortChange(field, dir);
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField
        label="Search by model"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        size="small"
        fullWidth
      />
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort by"
          value={`${sortBy}-${direction}`}
          onChange={handleSortChange}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
