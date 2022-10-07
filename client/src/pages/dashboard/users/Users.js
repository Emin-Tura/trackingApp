import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import UsersActions from "./UsersActions";
import { PersonAddAlt } from "@mui/icons-material";
import CreateUser from "./CreateUser";

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  useEffect(() => {
    setSelectedLink(link);
    getUsers(dispatch);
  }, [dispatch, link, setSelectedLink, users.length, setRowId]);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Resim",
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.photoURL} alt={params.row.name}>
            {params.row.name?.charAt(0).toUpperCase()}
          </Avatar>
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "İsim", width: 180 },
      { field: "email", headerName: "Email", width: 220 },
      {
        field: "role",
        headerName: "Rol",
        width: 150,
        type: "singleSelect",
        valueOptions: [
          "Yönetim",
          "IT / Bilişim",
          "İnsan Kaynakları",
          "Stajyer",
          "Satış",
          "Muhasebe",
        ],
        editable: currentUser.authority === "Tam Yetki" ? true : false,
      },
      {
        field: "active",
        headerName: "Aktif",
        width: 100,
        type: "boolean",
        editable: currentUser.authority === "Tam Yetki" ? true : false,
      },
      {
        field: "createdAt",
        headerName: "Kayıt Tarihi",
        width: 175,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      currentUser.authority === "Tam Yetki" && {
        field: "authority",
        headerName: "Yetki",
        width: 150,
        type: "singleSelect",
        valueOptions: ["Tam Yetki", "Kısıtlı Yetki", "Yetki Yok"],
        editable: true,
      },
      {
        field: "actions",
        headerName: "İşlem",
        type: "actions",
        width: 125,
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [currentUser.authority, rowId]
  );

  return (
    <>
      <Box
        sx={{
          height: 411,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Çalışanlar
        </Typography>
        <DataGrid
          columns={columns}
          rows={users}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "primaryDark.800" : "grey.100",
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "primaryDark.600"
                    : "grey.200",
              },
            },
            px: 2,
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
        />

        {currentUser.authority !== "Yetki Yok" && (
          <Button
            onClick={() => dispatch({ type: "OPEN_LOGIN" })}
            variant="contained"
            endIcon={<PersonAddAlt />}
            sx={{ my: 2, ml: 6 }}
          >
            Yeni Kayıt
          </Button>
        )}
      </Box>
      <CreateUser />
    </>
  );
};

export default Users;
