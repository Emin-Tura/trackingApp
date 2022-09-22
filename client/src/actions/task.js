import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/task";

export const createTask = async (task, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url, body: task }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Görev Başarıyla Oluşturuldu",
      },
    });
    dispatch({ type: "RESET_ASSIGNEE" });
  }
  dispatch({ type: "END_LOADING" });
};

export const getTasks = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_TASKS", payload: result });
  }
};

export const updateTask = (updateTask, taskId, dispatch) => {
  return fetchData(
    {
      url: `${url}/updateTask/${taskId}`,
      method: "PATCH",
      body: updateTask,
    },
    dispatch
  );
};
