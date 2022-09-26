import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/document";

export const createDocument = async (document, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url, body: document }, dispatch);
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
  dispatch({ type: "END_LOADING" });
};
