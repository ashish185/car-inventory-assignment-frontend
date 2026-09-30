import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Stack, Typography } from "@mui/material";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ py: 6, color: "text.secondary" }}>
      <InboxOutlinedIcon fontSize="large" />
      <Typography variant="subtitle1">{title}</Typography>
      {description && (
        <Typography variant="body2" sx={{ maxWidth: "40ch", textAlign: "center" }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
