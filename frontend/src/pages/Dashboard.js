import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">Dashboard</h2>
      <div className="text-center mt-6">
        <p className="text-gray-700">Welcome, {user && user.name}</p>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
