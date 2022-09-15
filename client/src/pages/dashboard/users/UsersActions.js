import { Box, CircularProgress, Fab, Tooltip } from "@mui/material";
import { Check, Delete, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import { green } from "@mui/material/colors";
import { deleteUser, updateStatus } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";

const UsersActions = ({ params, rowId, setRowId }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { role, active, _id } = params.row;
    const result = await updateStatus({ role, active }, _id, dispatch);
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [params.id, rowId, success]);

  const handleDelete = () => {
    let text = "Çalışanı Silmek istediğinize emin misiniz?";
    if (window.confirm(text)) {
      deleteUser(params.row, currentUser, dispatch);
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
        <Tooltip title="Çalışanı Sil">
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
