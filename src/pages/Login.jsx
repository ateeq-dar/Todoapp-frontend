import { useState } from "react";
import API from "../api";
import { saveToken } from "../utils/auth";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // 🔐 Save JWT token
      saveToken(res.data.token);

      // Move to app screen
      setAuth("app");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Login
        </button>

        <p
          className="text-sm mt-3 text-blue-500 cursor-pointer"
          onClick={() => setAuth("signup")}
        >
          Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
