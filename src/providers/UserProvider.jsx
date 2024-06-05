import React, { createContext, useState } from "react";

export const userContext = createContext(null);

function UserProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialState);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;
