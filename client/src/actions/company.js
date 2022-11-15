import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/company";

export const createCompany = async (company, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url,
      body: company,
    },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Süreç Başarıyla Oluşturuldu",
      },
    });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RE_RENDER" });
  }

  dispatch({ type: "END_LOADING" });
};

export const getCompanies = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_COMPANIES", payload: result });
  }
};

export const deleteCompany = async (currentUser, params, dispatch) => {
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
        message: "Süreç başarıyla silindi.",
      },
    });

    dispatch({ type: "DELETE_COMPANY", payload: result._id });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateCompany = async (updateCompany, companyId, dispatch) => {
  const result = await fetchData(
    {
      url: `${url}/updateCompany/${companyId}`,
      method: "PATCH",
      body: updateCompany,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Süreç Tamamlandı",
      },
    });
    dispatch({ type: "RE_RENDER" });
  }
};
