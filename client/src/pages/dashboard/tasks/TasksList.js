import React, { useCallback } from "react";
import { useValue } from "../../../context/ContextProvider";
import { Paper, Box, Stack, Avatar, Tooltip, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { Delete, DoneAll, Info } from "@mui/icons-material";
import { deleteTask, updateTask } from "../../../actions/task";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
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
      const { name, email } = currentUser;
      let text = "Görevi tamamlamak istediğinize emin misiniz?";
      if (window.confirm(text)) {
        const result = await updateTask(
          { completed: true, name, email },
          _id,
          dispatch
        );
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
    [currentUser, dispatch]
  );

  const handleDelete = useCallback(
    async (task) => {
      const { _id } = task;
      let text = "Görevi silmek istediğinize emin misiniz?";
      if (window.confirm(text)) {
        await deleteTask(_id, dispatch);
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {tasks.map((task) =>
          task.assigned.filter((name) => name === currentUser.name).length ||
          currentUser.authority === "Tam Yetki" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
              key={task._id}
            >
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

              {currentUser.authority === "Tam Yetki" && (
                <Fab
                  color="error"
                  sx={{
                    ml: 1,
                    width: 40,
                    height: 10,
                  }}
                  onClick={() => handleDelete(task)}
                >
                  <Delete />
                </Fab>
              )}

              <Item
                elevation={3}
                sx={{
                  textDecorationLine: `${
                    task.completed ? "line-through" : "none"
                  }`,
                  color: `${task.completed ? "#696969" : "none"}`,
                  backgroundColor: `${
                    task.assigned.filter((name) => name === currentUser.name)
                      .length &&
                    currentUser.authority === "Tam Yetki" &&
                    "rgba(103,128,159,.4)"
                  }`,
                  overflow: "auto",
                }}
              >
                <span
                  style={{
                    color: `${task.completed ? "#696969" : "#48cae4"}`,
                  }}
                >
                  {`@${task.assigned} :`}
                </span>
                <span>{task.task}</span>
              </Item>
              {task.currentUser.map((user) => (
                <React.Fragment key={user.id}>
                  <Item
                    elevation={3}
                    sx={{
                      width: "40% !important",
                      textDecorationLine: `${
                        task.completed ? "line-through" : "none"
                      }`,
                      color: `${task.completed ? "#696969" : "none"}`,
                      backgroundColor: `${
                        task.assigned.filter(
                          (name) => name === currentUser.name
                        ).length &&
                        currentUser.authority === "Tam Yetki" &&
                        "rgba(103,128,159,.4)"
                      }`,
                    }}
                  >
                    {`Görev ${task.currentUser[0].name}
                  tarafından ${moment(task.createdAt).format(
                    "YYYY-MM-DD HH:MM:SS"
                  )} tarihinde oluşturuldu.`}
                  </Item>
                  <Tooltip title={user?.email}>
                    <Avatar src={user?.photoURL} alt={user?.name}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                  {task.completed && (
                    <Tooltip
                      title={`Bu görev ${
                        task.name || task.email
                      } tarafından tamamlanmıştır.`}
                      style={{ position: "absolute", right: "-2rem" }}
                    >
                      <Info
                        sx={{
                          ml: 1,
                          color: "#696969",
                        }}
                      />
                    </Tooltip>
                  )}
                </React.Fragment>
              ))}
            </Box>
          ) : null
        )}
      </Stack>
    </Box>
  );
};

export default TasksList;
