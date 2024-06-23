import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  size?: "small" | "medium";
  type?: string;
  name: string;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
  sx?: SxProps;
};

const BBInput = ({
  size = "small",
  type,
  name,
  label,
  fullWidth,
  required,
  sx,
}: any) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          value={value?.fileName}
          onChange={(e) => {
                const target = e.target as HTMLInputElement;
                onChange(target.files?.[0]);
              }}
          variant="outlined"
          type={'file'}
          size={size}
          fullWidth={fullWidth}
          required={required}
          placeholder={label}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default BBInput;
