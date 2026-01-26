import authInterceptor from "./authInterceptor";

export const login = async (data) => {
  try {
    let response = await authInterceptor.post("auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? new Error(
          error?.response?.data?.apierror?.debugMessage || error.response.data?.apierror?.message || "An error occurred during login."
        )
      : new Error("Network Error");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await authInterceptor.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? new Error(
          error.response.data.message ||
            "An error occurred during registration."
        )
      : new Error("Network Error");
  }
};
