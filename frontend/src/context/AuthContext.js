import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3000/api/auth/me")
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    setUser(response.data.user);
  };

  const register = async (name, email, password, role) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      { name, email, password, role }
    );
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    setUser(response.data.user);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me");
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, fetchUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
