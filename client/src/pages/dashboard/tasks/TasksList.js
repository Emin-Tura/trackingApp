import React from "react";
import { useValue } from "../../../context/ContextProvider";
import { Paper, Box, Stack, Avatar, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";

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
}));

const TasksList = () => {
  const {
    state: { tasks },
  } = useValue();

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
            key={task._id}
          >
            <Item elevation={3}>{`@${task.assigned} : ${task.task}`}</Item>
            {task.currentUser.map((user) => (
              <React.Fragment key={user.id}>
                <Item elevation={3} sx={{ width: "40% !important" }}>
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
