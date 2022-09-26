import fetchData from "./utils/fetchData";
import deleteImages from "./utils/deleteImages";

const url = process.env.REACT_APP_SERVER_URL + "/product";

export const createProduct = async (product, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url, body: product }, dispatch);
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Ürün Başarıyla Oluşturuldu",
      },
    });
    dispatch({ type: "RESET_DETAIL" });
  }
  dispatch({ type: "END_LOADING" });
};

export const getProducts = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_PRODUCTS", payload: result });
  }
};

export const deleteProduct = async (currentUser, params, dispatch) => {
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
        message: "Ürün başarıyla silindi.",
      },
    });

    dispatch({ type: "DELETE_PRODUCT", payload: result._id });
    deleteImages(params.images, params._id);
  }

  dispatch({ type: "END_LOADING" });
};
