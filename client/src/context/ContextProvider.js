import React, { createContext, useContext, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  users: [],
  profile: { open: false, file: null, photoURL: "" },
  details: { title: "", description: "" },
  images: [],
  products: [],
};

const Context = createContext(initialState);
export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
