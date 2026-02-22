import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFormContext } from "react-hook-form";
import { FC } from "react";

export const SearchInput: FC<{ name: string; "data-testid"?: string }> = ({ name, "data-testid": testId }) => {
  const { register } = useFormContext();
  return (
    <TextField
      {...register(name)}
      fullWidth
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      data-testid={testId}
    />
  );
};
