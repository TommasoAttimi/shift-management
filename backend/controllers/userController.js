const User = require("../models/User");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "name email"
    );
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
