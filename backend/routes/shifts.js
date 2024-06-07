const express = require("express");
const {
  createShift,
  getShifts,
  updateShift,
  deleteShift,
} = require("../controllers/shiftController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createShift);
router.get("/", auth, getShifts);
router.put("/:id", auth, updateShift);
router.delete("/:id", auth, deleteShift);

module.exports = router;
