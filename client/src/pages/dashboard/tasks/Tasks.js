import {
  Box,
  Typography,
  Stack,
  Paper,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Check } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { createTask } from "../../../actions/task";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#e0e0e0",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Tasks = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const taskRef = useRef();
  useEffect(() => {
    setSelectedLink(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskSubmit = (e) => {
    const task = taskRef.current.value;
    createTask(currentUser, { task }, dispatch);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Görevler
      </Typography>
      <Container sx={{ width: "65%" }}>
        <TextField
          margin="normal"
          variant="standard"
          id="task"
          label="Lütfen Görevi Giriniz"
          type="text"
          fullWidth
          inputRef={taskRef}
          inputProps={{ minLength: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTaskSubmit}>
                  <Check />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </Box>
  );
};

export default Tasks;
