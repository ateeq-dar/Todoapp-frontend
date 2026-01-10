import { useState } from "react";
import API from "../api";

const Signup = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully. Please login.");
      setAuth("login"); // ✅ redirect to login

    } catch (err) {
      // 👇 even if user already exists
      alert("Account already exists. Please login.");
      setAuth("login"); // ✅ redirect to login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          Signup
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => setAuth("login")}
          className="w-full bg-gray-300 text-gray-700 p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Signup;
