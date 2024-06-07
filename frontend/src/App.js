import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ShiftList from "./pages/ShiftList";
import ShiftForm from "./pages/ShiftForm";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={Home} />
          <Route path="/login" element={Login} />
          <Route path="/register" element={Register} />
          <Route path="/dashboard" element={Dashboard} />
          <Route path="/shifts" element={ShiftList} />
          <Route path="/shift/new" element={ShiftForm} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;