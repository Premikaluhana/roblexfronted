import React, { useState, useContext, useEffect } from "react";
import { ContextApi } from "../../helper/ContextApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLogin, token } = useContext(ContextApi);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const success = await adminLogin(username, password);
      if (success) {
        navigate("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121215]">
      <div className="max-w-md w-full bg-[#1E2237] rounded-lg p-8 shadow-lg border border-[#21395e]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            BLX<span className="text-[#5B6DF6]">.GG</span>
          </h1>
          <h2 className="text-xl font-bold text-white mt-2">Admin Panel</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-center font-semibold">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-[#121215] text-white border border-[#21395e] focus:outline-none focus:ring-2 focus:ring-[#5B6DF6]"
              placeholder="admin"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-[#121215] text-white border border-[#21395e] focus:outline-none focus:ring-2 focus:ring-[#5B6DF6]"
              placeholder="********"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5B6DF6] hover:bg-[#4A5BE5] rounded-md text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
