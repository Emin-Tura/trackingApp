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
    state: { users },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Resim",
        width: 80,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
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
        valueOptions: ["Yönetim", "Bilgi İşlem", "İnsan Kaynakları"],
        editable: true,
      },
      {
        field: "active",
        headerName: "Aktif",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Kayıt Tarihi",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "actions",
        headerName: "Kaydet",
        type: "actions",
        width: 125,
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
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
            px: 6,
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
        />

        <Button
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
          variant="contained"
          endIcon={<PersonAddAlt />}
          sx={{ my: 2, ml: 6 }}
        >
          Yeni Kayıt
        </Button>
      </Box>
      <CreateUser />
    </>
  );
};

export default Users;
