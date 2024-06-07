import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ShiftForm from "./ShiftForm";
const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const { user, fetchUser, logout } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);
  const [editingShift, setEditingShift] = useState(null);
  const [showShiftForm, setShowShiftForm] = useState(false);

  useEffect(() => {
    const fetchShifts = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/shifts`, {
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shift?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/shifts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShifts(shifts.filter((shift) => shift._id !== id));
    } catch (error) {
      console.error("Error deleting shift:", error);
    }
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
    setShowShiftForm(true);
  };

  const handleSave = async (updatedShift) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/api/shifts/${updatedShift._id}`,
        updatedShift,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShifts(
        shifts.map((shift) =>
          shift._id === updatedShift._id ? response.data : shift
        )
      );
      setEditingShift(null);
      setShowShiftForm(false);
    } catch (error) {
      console.error("Error updating shift:", error);
    }
  };

  const handleCreate = () => {
    setEditingShift(null);
    setShowShiftForm(true);
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const groupShiftsByDay = (shifts) => {
    const grouped = {};
    daysOfWeek.forEach((day) => {
      grouped[day] = [];
    });
    shifts.forEach((shift) => {
      const shiftDate = new Date(shift.date);
      const dayName =
        daysOfWeek[shiftDate.getDay() === 0 ? 6 : shiftDate.getDay() - 1];
      if (dayName) {
        grouped[dayName].push(shift);
      }
    });
    return grouped;
  };

  const groupedShifts = groupShiftsByDay(shifts);

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
            <button
              onClick={handleCreate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Create New Shift
            </button>
            {showShiftForm && (
              <ShiftForm shift={editingShift} onSave={handleSave} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {daysOfWeek.map((day) => (
                <div key={day} className="bg-gray-100 shadow-md rounded p-4">
                  <h3 className="text-xl font-bold mb-4">{day}</h3>
                  {groupedShifts[day].length === 0 ? (
                    <p className="text-gray-500">No shifts</p>
                  ) : (
                    groupedShifts[day]
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((shift) => (
                        <div
                          key={shift._id}
                          className="bg-white shadow-md rounded px-4 py-2 mb-2"
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
                          <button
                            onClick={() => handleEdit(shift)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(shift._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {user.role === "employee" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {daysOfWeek.map((day) => (
                <div key={day} className="bg-gray-100 shadow-md rounded p-4">
                  <h3 className="text-xl font-bold mb-4">{day}</h3>
                  {groupedShifts[day].length === 0 ? (
                    <p className="text-gray-500">No shifts</p>
                  ) : (
                    groupedShifts[day]
                      .filter((shift) => shift.user._id === user._id)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((shift) => (
                        <div
                          key={shift._id}
                          className="bg-white shadow-md rounded px-4 py-2 mb-2"
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
                        </div>
                      ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
