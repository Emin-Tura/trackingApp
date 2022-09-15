import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

function PasswordField({ passwordRef, id = "password", label = "Parola" }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <TextField
      margin="dense"
      variant="outlined"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
