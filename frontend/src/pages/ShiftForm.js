import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const ShiftForm = ({ shift, onSave }) => {
  const [date, setDate] = useState(shift ? shift.date.split("T")[0] : "");
  const [startTime, setStartTime] = useState(shift ? shift.startTime : "");
  const [endTime, setEndTime] = useState(shift ? shift.endTime : "");
  const [isAvailable, setIsAvailable] = useState(
    shift ? shift.isAvailable : true
  );
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(
    shift ? shift.user._id : ""
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/users/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (shift) {
      setDate(shift.date.split("T")[0]);
      setStartTime(shift.startTime);
      setEndTime(shift.endTime);
      setIsAvailable(shift.isAvailable);
      setSelectedEmployee(shift.user._id);
    }
  }, [shift]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shiftData = {
      user: selectedEmployee,
      date,
      startTime,
      endTime,
      isAvailable,
    };

    if (shift) {
      onSave({ ...shiftData, _id: shift._id });
    } else {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`${API_URL}/api/shifts`, shiftData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">
        {shift ? "Edit Shift" : "Create Shift"}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="employee"
          >
            Employee
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select an Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="isAvailable"
          >
            Available
          </label>
          <select
            id="isAvailable"
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value === "true")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {shift ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftForm;
