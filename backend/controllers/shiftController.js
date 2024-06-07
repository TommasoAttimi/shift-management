const Shift = require("../models/Shift");

exports.createShift = async (req, res) => {
  const { user, date, startTime, endTime, isAvailable } = req.body;

  try {
    const shift = new Shift({ user, date, startTime, endTime, isAvailable });
    await shift.save();
    res.status(201).json(shift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().populate("user", "name email");
    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, isAvailable, user } = req.body;

    const updatedShift = await Shift.findByIdAndUpdate(
      id,
      { date, startTime, endTime, isAvailable, user },
      { new: true }
    );

    res.json(updatedShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteShift = async (req, res) => {
  try {
    const { id } = req.params;

    await Shift.findByIdAndDelete(id);

    res.json({ msg: "Shift deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
