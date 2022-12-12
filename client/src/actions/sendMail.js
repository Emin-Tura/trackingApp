import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/sendMail";

export const sendMail = async (mail, dispatch) => {
  const result = await fetchData({ url, body: mail }, dispatch);
  if (result) {
    dispatch({ type: "RESET_ASSIGNEE" });
  }
};
