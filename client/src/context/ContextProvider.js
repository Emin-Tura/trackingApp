import React, { createContext, useContext, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
  render: false,
  currentUser: null,
  openLogin: false,
  openSettings: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  users: [],
  profile: { open: false, file: null, photoURL: "" },
  details: { title: "", description: "" },
  images: [],
  file: [],
  docs: [],
  products: [],
  product: null,
  tasks: [],
  events: [],
  assigned: null,
  assigneeMail: null,
  companies: [],
  company: null,
  personName: [],
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
