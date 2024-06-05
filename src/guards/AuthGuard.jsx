import React, { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const user = useContext(userContext);
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default AuthGuard;
