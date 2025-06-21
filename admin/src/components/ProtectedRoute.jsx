import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const {isLoggedIn} = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
