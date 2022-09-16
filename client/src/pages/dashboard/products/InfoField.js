import { Avatar, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useValue } from "../../../context/ContextProvider";
import pendingIcon from "./icons/progress1.svg";
import { Check } from "@mui/icons-material";

let timer;
const InfoField = ({ mainProps, optionalProps = {}, minLength }) => {
  const { dispatch } = useValue();
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { [e.target.name]: e.target.value },
    });
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value.length < minLength) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    }, 1000);
  };

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={
        error && `Bu alan ${minLength} karakter veya daha fazla olmalıdır`
      }
      color={success ? "success" : "primary"}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }} />
            ) : (
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;
