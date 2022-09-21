import fetchData from "./utils/fetchData";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "../firebase/uploadFile";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getUsers = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USERS", payload: result });
  }
};

export const updateStatus = (updatedFields, userId, dispatch) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: "PATCH",
      body: updatedFields,
    },
    dispatch
  );
};

export const createUser = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const { name, email, password, file } = updatedFields;
  let body = { name, email, password };

  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }

    const result = await fetchData(
      {
        url: url + "/createuser",
        body,
        token: currentUser.token,
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Çalışan Başarıyla Oluşturuldu",
        },
      });
      dispatch({ type: "CLOSE_LOGIN" });
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};

export const deleteUser = async (user, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    {
      url: `${url}/${user._id}`,
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
        message: "Kullanıcı Silindi",
      },
    });

    dispatch({ type: "DELETE_USER", payload: result._id });
  }
  dispatch({ type: "END_LOADING" });
};
