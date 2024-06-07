import React, { useState, useEffect } from "react";
import axios from "axios";

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);

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
      const dayName = daysOfWeek[shiftDate.getDay() - 1];
      if (dayName) {
        grouped[dayName].push(shift);
      }
    });
    return grouped;
  };

  const groupedShifts = groupShiftsByDay(shifts);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">Weekly Schedule</h2>
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
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftList;
