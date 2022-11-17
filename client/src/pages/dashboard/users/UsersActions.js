import { Box, CircularProgress, Fab, Tooltip } from "@mui/material";
import { Check, Delete, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { green } from "@mui/material/colors";
import { deleteUser, updateStatus } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const UsersActions = ({ params, rowId, setRowId, currentRowId }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
    if (rowId) {
      currentRowId !== rowId &&
        dispatch({
          type: "UPDATE_ALERT",
          payload: {
            open: true,
            severity: "error",
            message: "Değişikliği Kaydetmediniz!",
          },
        });
    }
  }, [params.id, rowId, success, currentRowId, setRowId, dispatch]);

  const handleSubmit = async () => {
    setLoading(true);

    const { name, role, active, _id, authority } = params.row;
    const result = await updateStatus(
      { name, role, active, authority },
      _id,
      dispatch
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "UPDATE_USER", payload: null });
    navigate("/");
  };

  const handleDelete = () => {
    if (currentUser.authority === "Tam Yetki") {
      let text = "Kişiyi Silmek istediğinize emin misiniz?";
      if (window.confirm(text)) {
        if (currentUser.email === params.row.email) {
          handleLogout();
        }
        deleteUser(params.row, currentUser, dispatch);
      }
    } else {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "info",
          message: "Bu işlem için yetkiniz yok!",
        },
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          mx: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box>
        <Tooltip title="Sil">
          <Fab
            color="error"
            sx={{
              ml: 1,
              width: 40,
              height: 40,
            }}
            onClick={handleDelete}
          >
            <Delete />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
};

export default UsersActions;
