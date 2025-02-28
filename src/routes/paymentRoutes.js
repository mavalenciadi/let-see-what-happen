const express = require("express");

// Import controllers
const { processPayment } = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Define routes
router.post("/parkingPayment", authMiddleware, parkingPayment);

module.exports = router;