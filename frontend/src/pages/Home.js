import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Shift Management App
      </h1>
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/shifts"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          View Shifts
        </Link>
      </div>
    </div>
  );
};

export default Home;
