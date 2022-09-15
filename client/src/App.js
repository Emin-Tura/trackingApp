import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useValue } from "./context/ContextProvider";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Loading from "./components/Loading";
import Notification from "./components/Notification";

const App = () => {
  const {
    state: { currentUser },
  } = useValue();

  return (
    <>
      <BrowserRouter>
        <Routes>
          {currentUser ? (
            <Route path="/*" element={<Dashboard />} />
          ) : (
            <Route path="*" element={<Home />} />
          )}
        </Routes>
      </BrowserRouter>
      <Loading />
      <Notification />
    </>
  );
};

export default App;
