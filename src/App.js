import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { app } from "./services/firebaseServices";
import Dashboard from "./pages/Dashboard";
import UserProvider from "./providers/UserProvider";
import AuthGuard from "./guards/AuthGuard";

function App() {
  // const newApp = app;
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
