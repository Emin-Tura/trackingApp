import fetchData from "./utils/fetchData";

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
    dispatch({ type: "RESET_PRODUCT" });
  }

  dispatch({ type: "END_LOADING" });
};
