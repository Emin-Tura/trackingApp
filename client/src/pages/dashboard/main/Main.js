import React, { useEffect } from "react";
import { Group, Store } from "@mui/icons-material";
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
import AreaUsers from "./AreaUsers";

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <Paper elevation={4} sx={{ p: 3 }}>
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
      <Paper elevation={4} sx={{ p: 3 }}>
        <Typography variant="h4">Ürün Sayısı</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Store sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">11</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Son Eklenen Çalışanlar</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
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
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <AreaUsers />
      </Paper>
    </Box>
  );
};

export default Main;
