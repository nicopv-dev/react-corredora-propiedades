import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/localStorage";

export default function ProtectedRoutes({ session, children }) {
  if (getAccessToken()) {
    return <Navigate to="/login" />;
  }

  if (!session?.user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
