import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/task";

export const createTask = async (currentUser, task, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    { url, body: task, token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Görev Başarıyla Oluşturuldu",
      },
    });
    dispatch({ type: "RESET_TASK" });
  }
  dispatch({ type: "END_LOADING" });
};
