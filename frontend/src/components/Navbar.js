import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Shift Management
        </Link>
        <div className="flex space-x-4">
          {!user && (
            <>
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
            </>
          )}
          {user && <></>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
