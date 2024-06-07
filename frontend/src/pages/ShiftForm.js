import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ShiftForm = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/users/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/shifts",
        {
          user: selectedEmployee,
          date,
          startTime,
          endTime,
          isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(); // Ricarica la pagina per mostrare i nuovi turni
    } catch (err) {
      console.error("Error creating shift:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mt-6">Create Shift</h2>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftForm;
