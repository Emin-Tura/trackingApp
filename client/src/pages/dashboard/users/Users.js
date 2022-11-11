import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, MenuItem, Typography } from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridCsvExportMenuItem,
  gridFilteredSortedRowIdsSelector,
  GridToolbarContainer,
  GridToolbarExportContainer,
  gridVisibleColumnFieldsSelector,
  trTR,
  useGridApiContext,
} from "@mui/x-data-grid";
import { useValue } from "../../../context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import UsersActions from "./UsersActions";
import { PersonAddAlt } from "@mui/icons-material";
import CreateUser from "./CreateUser";

const getJson = (apiRef) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  // Stringify with some indentation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
  return JSON.stringify(data, null, 2);
};

const exportBlob = (blob, filename) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

const JsonExportMenuItem = (props) => {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: "text/json",
        });

        exportBlob(blob, "DataGrid_demo.json");

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
};

JsonExportMenuItem.propTypes = {
  hideMenu: PropTypes.func,
};

const csvOptions = { delimiter: ";" };

const CustomExportButton = (props) => (
  <GridToolbarExportContainer {...props}>
    <GridCsvExportMenuItem options={csvOptions} />
    <JsonExportMenuItem />
  </GridToolbarExportContainer>
);

const CustomToolbar = (props) => (
  <GridToolbarContainer {...props}>
    <CustomExportButton />
  </GridToolbarContainer>
);

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [currentRowId, setCurrentRowId] = useState(null);

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
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
        editable: true,
      },
      {
        field: "active",
        headerName: "Aktif",
        width: 75,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Kayıt Tarihi",
        width: 150,
        renderCell: (params) =>
          moment(params?.row?.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "updatedAt",
        headerName: "Çıkış Tarihi",
        width: 150,
        renderCell: (params) =>
          params.row.active
            ? "Aktif"
            : moment(params?.row?.updatedAt).format("YYYY-MM-DD H:mm:ss"),
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
          <UsersActions {...{ params, rowId, setRowId, currentRowId }} />
        ),
      },
    ],
    [currentUser.authority, rowId, currentRowId]
  );

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mb: 3 }}
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
          onCellClick={(params) => setCurrentRowId(params.id)}
          isCellEditable={(params) => currentUser.authority === "Tam Yetki"}
          components={{ Toolbar: CustomToolbar }}
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
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
