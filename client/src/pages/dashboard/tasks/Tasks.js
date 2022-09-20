import {
  Box,
  Typography,
  Container,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Check } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { createTask, getTasks } from "../../../actions/task";
import ChipSelect from "../../../components/ChipSelect";
import { getUsers } from "../../../actions/user";
import TasksList from "./TasksList";

const Tasks = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser, assigned },
  } = useValue();
  const taskRef = useRef();

  useEffect(() => {
    setSelectedLink(link);
    getUsers(dispatch);
    getTasks(dispatch);
  }, [dispatch, link, setSelectedLink]);

  const handleTaskSubmit = (e) => {
    const task = taskRef.current.value;
    const newTask = { task, assigned };

    createTask(currentUser, newTask, dispatch);
    taskRef.current.value = "";
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
      <Container sx={{ width: "75%", display: "flex", alignItems: "center" }}>
        <TextField
          margin="normal"
          variant="standard"
          id="task"
          label="Lütfen Görevi Giriniz"
          type="text"
          fullWidth
          inputRef={taskRef}
          inputProps={{ minLength: 2 }}
        />
        <ChipSelect />
        <IconButton
          onClick={handleTaskSubmit}
          disabled={!taskRef.current?.value}
        >
          <Check />
        </IconButton>
      </Container>
      <Divider sx={{ my: 1, opacity: 0.8 }} />
      <TasksList />
    </Box>
  );
};

export default Tasks;
