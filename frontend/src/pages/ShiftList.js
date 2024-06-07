import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchShifts = async () => {
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
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">Shifts</h2>
      <div className="mt-6">
        {shifts.map((shift) => (
          <div
            key={shift._id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <p>
              <strong>Date:</strong> {new Date(shift.date).toLocaleDateString()}
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
              <strong>Available:</strong> {shift.isAvailable ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftList;
