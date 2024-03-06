import React from "react";
import { useSelector } from "react-redux";
import { selectAuthSuccess, selectLoggedInUser } from "./AuthSlice";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const user = useSelector(selectAuthSuccess);

  if (!user) {
    return <Navigate to="/signup" replace={true} />;
  }
  return <>{children}</>;
};

export default Protected;
