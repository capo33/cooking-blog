import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/app/store";

const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  return user?.role === "admin" ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;
