import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ShiftForm from "./ShiftForm";

const Dashboard = () => {
  const { user, fetchUser, logout } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/shifts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">Dashboard</h2>
      <div className="text-center mt-6">
        <p className="text-gray-700">Welcome, {user && user.name}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Logout
        </button>
      </div>
      <div className="mt-6">
        {user.role === "manager" && (
          <div>
            <h3 className="text-xl font-bold">Manage Shifts</h3>
            <ShiftForm />
            <ul>
              {shifts.map((shift) => (
                <li
                  key={shift._id}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(shift.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {shift.startTime}
                  </p>
                  <p>
                    <strong>End Time:</strong> {shift.endTime}
                  </p>
                  <p>
                    <strong>User:</strong> {shift.user.name}
                  </p>
                  <p>
                    <strong>Available:</strong>{" "}
                    {shift.isAvailable ? "Yes" : "No"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {user.role === "employee" && (
          <div>
            <h3 className="text-xl font-bold">Your Shifts</h3>
            <ul>
              {shifts
                .filter((shift) => shift.user._id === user._id)
                .map((shift) => (
                  <li
                    key={shift._id}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(shift.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Start Time:</strong> {shift.startTime}
                    </p>
                    <p>
                      <strong>End Time:</strong> {shift.endTime}
                    </p>
                    <p>
                      <strong>Available:</strong>{" "}
                      {shift.isAvailable ? "Yes" : "No"}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
