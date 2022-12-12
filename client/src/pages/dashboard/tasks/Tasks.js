import {
  Box,
  Typography,
  Container,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { Check } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { createTask, getTasks } from "../../../actions/task";
import { sendMail } from "../../../actions/sendMail";
import ChipSelect from "./ChipSelect";
import { getUsers } from "../../../actions/user";
import TasksList from "./TasksList";

const Tasks = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser, assigned, render, assigneeMail },
  } = useValue();
  const taskRef = useRef();
  const handleTaskSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const task = taskRef.current.value;
      const newTask = { task, assigned, currentUser };
      sendMail({ assigneeMail, task }, dispatch);
      createTask(newTask, dispatch);
      taskRef.current.value = "";
      dispatch({ type: "UPDATE_PERSON_NAME", payload: [] });
      dispatch({ type: "SET_ASSIGNEE_MAIL", payload: [] });
    },
    [assigned, assigneeMail, currentUser, dispatch]
  );

  useEffect(() => {
    setSelectedLink(link);
    getUsers(dispatch);
    getTasks(dispatch);
  }, [dispatch, link, setSelectedLink, handleTaskSubmit, render]);

  return (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Görevler
      </Typography>

      {currentUser.authority === "Tam Yetki" && (
        <form onSubmit={handleTaskSubmit}>
          <Container
            sx={{ width: "75%", display: "flex", alignItems: "center" }}
          >
            <TextField
              margin="normal"
              variant="standard"
              id="task"
              label="Lütfen Görevi Giriniz"
              type="text"
              fullWidth
              multiline
              inputRef={taskRef}
              inputProps={{ minLength: 2 }}
              required
            />
            <ChipSelect required={true} />
            <IconButton type="submit">
              <Check />
            </IconButton>
          </Container>
        </form>
      )}

      <Divider sx={{ my: 2, opacity: 0.8 }} />

      <Container
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TasksList />
      </Container>
    </Box>
  );
};

export default Tasks;
