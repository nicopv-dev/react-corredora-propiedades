import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/localStorage";

export default function AuthRoutes() {
  if (getAccessToken()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
