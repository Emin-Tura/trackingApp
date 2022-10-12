import React, { useEffect } from "react";
import {
  AddTask,
  EventNote,
  Group,
  Store,
  Work,
  WorkHistory,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { getUsers } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";
import moment from "moment";
import AreaUsersProducts from "./AreaUsersProducts";
import { getProducts } from "../../../actions/product";
import { getTasks } from "../../../actions/task";
import { getCompanies } from "../../../actions/company";
import { getEvents } from "../../../actions/event";

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { users, products, tasks, currentUser, companies, events },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    getUsers(dispatch);
    getProducts(dispatch);
    getTasks(dispatch);
    getCompanies(dispatch);
    getEvents(dispatch);
  }, [dispatch, link, setSelectedLink]);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Çalışan Sayısı</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Ürün Sayısı</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Store sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{products.length}</Typography>
        </Box>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Toplam Süreç Sayısı</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Work sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{companies.length}</Typography>
        </Box>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Aktif Süreç Sayısı</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WorkHistory sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">
            {companies.filter((e) => e.completed === false).length}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <AreaUsersProducts />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Son Eklenen Görevler</Typography>
          <List>
            {tasks
              .filter((e) => e.completed === false)
              .slice(0, 4)
              .map((task, i) =>
                task.assigned.filter((name) => name === currentUser.name)
                  .length || currentUser.authority === "Tam Yetki" ? (
                  <Box key={task?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <AddTask fontSize="large" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${task?.task}`}
                        secondary={`Oluşturma Zamanı: ${moment(
                          task?.createdAt
                        ).format("YYYY-MM-DD H:mm:ss")}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                ) : null
              )}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.8 }} />

        <Box>
          <Typography>Son Eklenen Süreçler</Typography>
          <List>
            {companies
              .filter((e) => e.completed === false)
              .slice(0, 4)
              .map((company, i) => (
                <Box key={company._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Work fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={company?.name}
                      secondary={`Oluşturma Zamanı: ${moment(
                        company?.createdAt
                      ).format("YYYY-MM-DD H:mm:ss")}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.8 }} />

        <Box>
          <Typography>Son Eklenen Olaylar</Typography>
          <List>
            {events.slice(0, 4).map((event, i) => (
              <Box key={event?._id}>
                <ListItem>
                  <ListItemAvatar>
                    <EventNote fontSize="large" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={event?.title}
                    secondary={`Tarih: ${moment(event?.startDate).format(
                      "YYYY-MM-DD H:mm"
                    )} - ${moment(event?.endDate).format("H:mm")}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.8 }} />
        <Box>
          <Typography>Son Eklenen Çalışanlar</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Oluşturma Zamanı: ${moment(
                      user?.createdAt
                    ).format("YYYY-MM-DD H:mm:ss")}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
