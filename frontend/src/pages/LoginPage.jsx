import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      
      // On success, the backend sends a token. Store it.
      localStorage.setItem("token", res.data.token);
      
      // Redirect to the dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid Credentials. Please try again.");
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}