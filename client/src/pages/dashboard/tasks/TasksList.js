import React, { useCallback } from "react";
import { useValue } from "../../../context/ContextProvider";
import { Paper, Box, Stack, Avatar, Tooltip, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { DoneAll } from "@mui/icons-material";
import { updateTask } from "../../../actions/task";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "left",
  color: theme.palette.text.secondary,
  width: "75%",
  minHeight: "55px",
  marginRight: "8px",
  marginLeft: "8px",
}));

const TasksList = () => {
  const {
    state: { tasks, currentUser },
    dispatch,
  } = useValue();

  const handleTask = useCallback(
    async (task) => {
      const { _id } = task;
      let text = "Görevi tamamlamak istediğinize emin misiniz?";
      if (window.confirm(text)) {
        const result = await updateTask({ completed: true }, _id, dispatch);
        if (result) {
          dispatch({
            type: "UPDATE_ALERT",
            payload: {
              open: true,
              severity: "success",
              message: "Görev Başarıyla Güncellendi",
            },
          });
        }
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
            key={task._id}
          >
            {currentUser.authority !== "Yetki Yok" && (
              <Fab
                color={`${task.completed ? "default" : "primary"}`}
                sx={{
                  width: 40,
                  height: 20,
                }}
                onClick={() => handleTask(task)}
                disabled={task.completed}
              >
                <DoneAll />
              </Fab>
            )}

            <Item
              elevation={3}
              sx={{
                textDecorationLine: `${
                  task.completed ? "line-through" : "none"
                }`,
              }}
            >{`@${task.assigned} : ${task.task}`}</Item>
            {task.currentUser.map((user) => (
              <React.Fragment key={user.id}>
                <Item
                  elevation={3}
                  sx={{
                    width: "40% !important",
                    textDecorationLine: `${
                      task.completed ? "line-through" : "none"
                    }`,
                  }}
                >
                  {`Görev ${user.id === task._id ? "siz" : user.email}
                  hesabından ${moment(task.createdAt).format(
                    "YYYY-MM-DD HH:MM:SS"
                  )} tarihinde oluşturuldu.`}
                </Item>
                <Tooltip title={user.email}>
                  <Avatar src={user.photoURL} />
                </Tooltip>
              </React.Fragment>
            ))}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TasksList;
