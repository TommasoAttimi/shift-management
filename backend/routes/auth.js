const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth"); // Importa il middleware di autenticazione

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);

module.exports = router;
