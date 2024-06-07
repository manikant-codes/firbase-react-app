import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseServices";
import { useNavigate } from "react-router-dom";

export const userContext = createContext(null);

function UserProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      }
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;
