import axios from "axios";

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
