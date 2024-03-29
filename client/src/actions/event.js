import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/event";

export const createEvent = async (event, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url, body: event }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Olay Başarıyla Oluşturuldu",
      },
    });
    dispatch({ type: "RESET_ASSIGNEE" });
  }
  dispatch({ type: "END_LOADING" });
};

export const getEvents = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_EVENTS", payload: result });
  }
};

export const deleteEvent = async (eventId, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${eventId}`,
      method: "DELETE",
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Olay Silindi",
      },
    });

    dispatch({ type: "DELETE_EVENT", payload: result._id });
  }
  dispatch({ type: "END_LOADING" });
};

export const updateEvent = (updatedEvents, eventId, dispatch) => {
  return fetchData(
    {
      url: `${url}/updateEvent/${eventId}`,
      method: "PATCH",
      body: updatedEvents,
    },
    dispatch
  );
};
