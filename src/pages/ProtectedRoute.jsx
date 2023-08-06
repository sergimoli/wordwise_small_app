import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  //it will wrap the entire application into this component

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated],
    navigate
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
