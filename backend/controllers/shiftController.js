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
  const { id } = req.params;
  const { user, date, startTime, endTime, isAvailable } = req.body;

  try {
    let shift = await Shift.findById(id);

    if (!shift) {
      return res.status(404).json({ msg: "Shift not found" });
    }

    shift.user = user || shift.user;
    shift.date = date || shift.date;
    shift.startTime = startTime || shift.startTime;
    shift.endTime = endTime || shift.endTime;
    shift.isAvailable =
      isAvailable !== undefined ? isAvailable : shift.isAvailable;

    await shift.save();
    res.json(shift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteShift = async (req, res) => {
  const { id } = req.params;

  try {
    const shift = await Shift.findById(id);

    if (!shift) {
      return res.status(404).json({ msg: "Shift not found" });
    }

    await shift.remove();
    res.json({ msg: "Shift removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
