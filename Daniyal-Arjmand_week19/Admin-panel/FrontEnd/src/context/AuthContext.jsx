import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
      const navigate = useNavigate();
  const [token, setToken] = useState(
    () => localStorage.getItem("authToken") || null
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (token) localStorage.setItem("authToken", token);
    else localStorage.removeItem("authToken");
  }, [token]);

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");
  }, [username]);

  const login = ({ token, username }) => {
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    setToken(null);
    setUsername("");
    navigate("/");
  };

  return (
    <AuthCtx.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
