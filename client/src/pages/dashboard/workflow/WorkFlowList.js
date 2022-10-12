import { Check, Clear, Edit, Info } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useCallback } from "react";
import { deleteCompany, updateCompany } from "../../../actions/company";
import { useValue } from "../../../context/ContextProvider";

const WorkFlowList = () => {
  const {
    state: { companies, currentUser },
    dispatch,
  } = useValue();

  const handleDelete = (params) => {
    if (currentUser.authority === "Tam Yetki") {
      let text = "Süreci Silmek İstediğinize Emin Misiniz?";
      if (window.confirm(text)) {
        deleteCompany(currentUser, params, dispatch);
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

  const handleSubmit = useCallback(
    async (company) => {
      const { email, name } = currentUser;
      const { _id } = company;
      if (currentUser.authority !== "Yetki Yok") {
        let text = "Süreci tamamlamak istediğinize emin misiniz?";
        if (window.confirm(text)) {
          const result = await updateCompany(
            { completed: true, completedEmail: email, completedName: name },
            _id,
            dispatch
          );
          if (result) {
            dispatch({
              type: "UPDATE_ALERT",
              payload: {
                open: true,
                severity: "success",
                message: "Sürec Başarıyla Tamamlandı",
              },
            });
            window.location.reload();
          }
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
    },
    [currentUser, dispatch]
  );

  return (
    <Box sx={{ display: "flex" }}>
      {companies.map((company, index) => (
        <Card
          key={index}
          sx={{
            width: 200,
            mt: 2,
            mr: 2,
            p: 1.25,
            position: "relative",
            background: `${company.completed && "#6b9080"}`,
          }}
        >
          <CardActions>
            {company.completed && (
              <Tooltip
                title={`Bu süreç ${
                  company.completedName || company.completedEmail
                } tarafından tamamlandı olarak işaretlenmiştir.`}
                style={{ position: "absolute", left: 2, top: 5 }}
              >
                <Info />
              </Tooltip>
            )}
            <IconButton
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => handleDelete(company)}
            >
              <Tooltip title={"Süreci Sil"}>
                <Clear />
              </Tooltip>
            </IconButton>
          </CardActions>
          <CardContent
            sx={{
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch({ type: "UPDATE_COMPANY", payload: company })
            }
          >
            <Typography
              variant="h6"
              component="div"
              color="text.secondary"
              gutterBottom
            >
              {company.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {moment(company?.day).format("DD-MM-YYYY")}
            </Typography>
            <Typography variant="body2">{company?.product}</Typography>
            <Typography variant="body2">
              Süreç :{company?.completed ? " Tamamlandı" : " Devam Ediyor"}
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: 1 }}>
            <IconButton
              disabled={company.completed}
              sx={{ position: "absolute", left: 0, bottom: 2 }}
            >
              <Tooltip title={"Süreci Düzenle"}>
                <Edit />
              </Tooltip>
            </IconButton>
            <IconButton
              sx={{ position: "absolute", right: 0, bottom: 2 }}
              onClick={() => handleSubmit(company)}
              disabled={company.completed}
            >
              <Tooltip title={"Süreci Tamamla"}>
                <Check />
              </Tooltip>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default WorkFlowList;
