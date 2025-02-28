const express = require("express");
const { createParking, getParkings, finishParking } = require("../controllers/parkingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/createParking", authMiddleware, createParking);
router.get("/getParkings", authMiddleware, getParkings);
router.get("/getParkingByVehiclePlate/:vehiclePlate", authMiddleware, getParkingByVehiclePlate);
router.get("/getParkingByParkingId/:parkingId", authMiddleware, getParkingByParkingId);
router.put("/finishParking/:vehiclePlate", authMiddleware, finishParking);

module.exports = router;

