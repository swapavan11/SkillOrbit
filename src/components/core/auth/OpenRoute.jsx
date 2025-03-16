import { useSelector } from "react-redux";
import { redirect, Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  if (!token) {
    return children;
  } else return <Navigate to="/dashboard/my-profile" />;
}

export default OpenRoute;
