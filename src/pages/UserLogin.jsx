import { useState } from "react";
import { login } from "../api/Auth";
import logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import CommonInputFields from "../components/CommonInputFields";
import { useAuth } from "../context/AuthContext";
import swal from "sweetalert";

export const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { loginUser } = useAuth();

  const fields = [
                    {
                      name: "email",
                      label: "Username or Email",
                      type: "text",
                      placeholder: "Enter your username or email address",
                      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",
                      errorMessage: "Please enter a valid email.",
                    },
                    {
                      name: "password",
                      label: "Password",
                      type: "password",
                      placeholder: "Enter your password",
                      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$",
                      errorMessage: "Min 8 chars, include upper, lower, number, special.",
                    },
                  ]

  const validateAll = () => {
    const errs = {};
    const email = loginData.email?.trim();
    const password = loginData.password ?? "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!email) errs.email = "This field is required.";
    else if (!emailRegex.test(email)) errs.email = "Please enter a valid email.";

    if (!password) errs.password = "This field is required.";
    else if (!pwdRegex.test(password)) errs.password = "Min 8 chars, include upper, lower, number, special.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    // client-side validation before sending
    if (!validateAll()) return;

    setLoading(true);
    try {
      const response = await login(loginData);
      const { token, user } = response;
      loginUser(user?.name, token);
      navigate("/books");
      await swal({ title: "Login successful", text: "You have been logged in.", icon: "success", timer: 1500 });
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error.message);
     swal({ title: "Login failed", text: error?.message || "Unable to login.", icon: "error" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f3f1e8] px-4">
        {/* Card */}
        <div className="w-full mt-2 max-w-5xl bg-[#f6f4eb] rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-4">
            <div className="text-lg font-semibold">
              <span className="text-[#f59e0b]">AI</span>
              <span className="text-gray-800">Books</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row gap-8 px-8 py-10">

  {/* Image */}
  <div className="flex order-1 md:order-2 items-center justify-center w-full">
    <img
      src={logo}
      alt="Books Illustration"
      className="w-full max-w-xs md:max-w-sm max-h-80 object-contain rounded-xl"
    />
  </div>

  {/* Form */}
  <div className="flex flex-col order-2 md:order-1 justify-center max-w-md w-full">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Log in
    </h2>

    <div className="space-y-4">
      <CommonInputFields
        inputData={fields}
        setValue={setLoginData}
        value={loginData}
        externalErrors={fieldErrors}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-[#2f3e2f] text-white py-2.5 rounded-md font-medium hover:bg-[#263326] transition disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </div>

    <div className="text-sm text-gray-600 mt-4">
      <button
        onClick={() => navigate("/register")}
        className="w-full bg-[#2f3e2f] text-white py-2.5 rounded-md font-medium hover:bg-[#263326] transition"
      >
        Sign Up
      </button>
      <h4 className="mt-2 text-center">Don’t have an account?</h4>
    </div>
  </div>

</div>

        </div>
        <Loader show={loading} />
      </div>
    </>
  );
};
