import { Notifications } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
} from "@mui/material";
import React from "react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useValue } from "../context/ContextProvider";
import { Box } from "@mui/system";
import moment from "moment";

const NotificationBell = () => {
  const {
    state: { tasks, currentUser },
  } = useValue();

  const badgeContent = tasks
    .filter((e) => e.completed === false)
    .map((task) =>
      task.assigned.filter((name) => name === currentUser.name).length ? 1 : 0
    )
    .reduce((a, b) => a + b, 0);

  const newNotifications = `${badgeContent} yeni göreviniz var!`;
  const noNotifications = "Yeni görev yok!";

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton
            size="large"
            color={badgeContent > 0 ? "primary" : "inherit"}
            {...bindTrigger(badgeContent > 0 && popupState)}
          >
            <Tooltip title={badgeContent ? newNotifications : noNotifications}>
              <Badge color="error" badgeContent={badgeContent}>
                <Notifications />
              </Badge>
            </Tooltip>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {tasks
                .filter((e) => e.completed === false)
                .slice(0, 6)
                .map((task) =>
                  task.assigned.filter((name) => name === currentUser.name)
                    .length ? (
                    <Box key={task?._id}>
                      <ListItem>
                        <ListItemText
                          primary={`${task?.task}`}
                          secondary={`Oluşturma Zamanı: ${moment(
                            task?.createdAt
                          ).format("YYYY-MM-DD H:mm:ss")}`}
                        />
                      </ListItem>
                    </Box>
                  ) : null
                )}
            </List>
          </Popover>
        </>
      )}
    </PopupState>
  );
};

export default NotificationBell;
