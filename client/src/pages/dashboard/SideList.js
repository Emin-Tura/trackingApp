import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  Logout,
  Dashboard,
  PeopleAlt,
  Store,
  CalendarMonth,
  Task,
  DocumentScanner,
} from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import { useNavigate, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Users from "./users/Users";
import Products from "./products/Products";
import Calendar from "./calendar/Calendar";
import Tasks from "./tasks/Tasks";
import logo from "../../assets/logo1.png";
import Documents from "./documents/Documents";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideList = ({ open, setOpen }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [selectedLink, setSelectedLink] = React.useState("");

  const list = useMemo(
    () => [
      {
        title: "Anasayfa",
        icon: <Dashboard />,
        link: "",
        component: <Main {...{ setSelectedLink, link: "" }} />,
      },
      {
        title: "Çalışanlar",
        icon: <PeopleAlt />,
        link: "users",
        component: <Users {...{ setSelectedLink, link: "users" }} />,
      },
      {
        title: "Ürünler",
        icon: <Store />,
        link: "products",
        component: <Products {...{ setSelectedLink, link: "products" }} />,
      },
      {
        title: "Takvim",
        icon: <CalendarMonth />,
        link: "calendar",
        component: <Calendar {...{ setSelectedLink, link: "calendar" }} />,
      },
      {
        title: "Görevler",
        icon: <Task />,
        link: "tasks",
        component: <Tasks {...{ setSelectedLink, link: "tasks" }} />,
      },
      {
        title: "Dokümanlar",
        icon: <DocumentScanner />,
        link: "documents",
        component: <Documents {...{ setSelectedLink, link: "documents" }} />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "UPDATE_USER", payload: null });
    navigate("/");
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ""}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 75, height: 75 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && (
            <>
              <Typography>{currentUser?.name}</Typography>
              <Typography variant="body2">
                {currentUser?.role || "role"}
              </Typography>
              <Typography variant="body2">
                {currentUser?.authority || "yetki"}
              </Typography>
              <Typography variant="body2">{currentUser?.email}</Typography>
            </>
          )}
          <Tooltip title="Çıkış" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 3,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img src={logo} alt={"logo"} width="50" height="50" />
          {open && (
            <Typography variant="body">
              Cypoint © Tüm Hakları Saklıdır
            </Typography>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list?.map((item) => (
            <Route
              key={item?.title}
              path={item?.link}
              element={item?.component}
            />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default SideList;
