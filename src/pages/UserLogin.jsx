import { useState } from "react";
import { login } from "../api/Auth";
import logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleLoginDetails = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(loginData);
      const { token, user } = response;
      loginUser(user?.name, token);
      navigate("/books");
      console.log("Login successful", response);
      setSuccess("Login successful!");
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e8] px-4">
        {/* Card */}
        <div className="w-full max-w-5xl bg-[#f6f4eb] rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-4">
            <div className="text-lg font-semibold">
              <span className="text-[#f59e0b]">AI</span>
              <span className="text-gray-800">Books</span>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-10">
            {/* Left - Form */}
            <div className="flex flex-col justify-center max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Log in
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username or email address"
                    onChange={handleLoginDetails}
                    name="email"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f3e2f]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleLoginDetails}
                    name="password"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f3e2f]"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className=" cursor-pointer w-full bg-[#2f3e2f] text-white py-2.5 rounded-md font-medium hover:bg-[#263326] transition"
                >
                  Log in
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-4">
                <button onClick={() => navigate("/register")} className=" cursor-pointer w-full bg-[#2f3e2f] text-white py-2.5 rounded-md font-medium hover:bg-[#263326] transition">
                  Sign Up
                </button>
                <h4>Don’t have an account?</h4>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className=" md:flex items-center justify-center rounded-xl">
              <img
                src={logo}
                alt="Books Illustration"
                className="max-w-sm "
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
        <Loader show={loading} />
      </div>
    </>
  );
};
