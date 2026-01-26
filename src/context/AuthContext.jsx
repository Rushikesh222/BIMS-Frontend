import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: Boolean(localStorage.getItem('authToken')),
    userName: localStorage.getItem('userName') || null,
  });

  const loginUser = (userName, token) => {
    console.log("Storing auth data", { userName, token });
    if (token) localStorage.setItem('authToken', token);
    if (userName) localStorage.setItem('userName', userName);
    setAuthData({
      isAuthenticated: Boolean(token),
      userName: userName || null,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setAuthData({
      isAuthenticated: false,
      userName: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authData, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);