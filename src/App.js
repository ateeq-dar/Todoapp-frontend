import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getToken } from "./utils/auth";

function App() {
  const [auth, setAuth] = useState("login");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth("app");
    }
  }, []);

  if (auth === "login") return <Login setAuth={setAuth} />;
  if (auth === "signup") return <Signup setAuth={setAuth} />;

  return <Todo setAuth={setAuth} />;
}

export default App;
