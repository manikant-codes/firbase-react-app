import React, { useContext } from "react";
import { userContext } from "../providers/UserProvider";

function Home() {
  const user = useContext(userContext);
  console.log(user);
  return <div>Home</div>;
}

export default Home;
