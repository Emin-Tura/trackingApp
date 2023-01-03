import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import { useValue } from "../../../context/ContextProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ChipSelectTeam = ({ required }) => {
  const {
    state: { users, personName },
    dispatch,
  } = useValue();

  const theme = useTheme();
  // const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // setPersonName(typeof value === "string" ? value.split(",") : value);
    dispatch({ type: "UPDATE_PERSON_NAME", payload: value });
    dispatch({ type: "SET_ASSIGNEE", payload: value });
    dispatch({
      type: "SET_ASSIGNEE_MAIL",
      payload: users
        .filter((user) => value.includes(user.name))
        .map((value) => value.email),
    });
  };

  return (
    <div style={{ margin: "0 1rem" }}>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-chip-label">
          Mail Atılacak Ekip
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Görevlendirilen" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          required={required}
        >
          {users.map(
            (name) =>
              name.active === true && (
                <MenuItem
                  key={name.name}
                  value={name.name}
                  style={getStyles(name, personName, theme)}
                >
                  {name.name}
                </MenuItem>
              )
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChipSelectTeam;
