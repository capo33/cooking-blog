import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/app/store";

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to='/login' replace />; // replace: replace any path history with the new path
};

export default PrivateRoute;
