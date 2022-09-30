import axios from "axios";
import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/document";

export const createDocument = async (document, dispatch) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = axios.post(url, document);
    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Doküman Başarıyla Oluşturuldu",
        },
      });

      dispatch({ type: "RESET_DETAIL" });
    }
  } catch {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: "Doküman Oluşturulamadı",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const getDocument = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_DOCS", payload: result });
  }
};

export const deleteDocument = async (currentUser, params, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${params._id}`,
      method: "DELETE",
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Doküman başarıyla silindi.",
      },
    });

    dispatch({ type: "DELETE_DOC", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const downloadDocument = async (currentUser, params, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/download/${params._id}`,
      method: "GET",
      token: currentUser?.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Doküman başarıyla indirildi.",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};
