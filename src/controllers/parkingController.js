const Parking = require('../models/Parking');
const { Op } = require('sequelize');


// Create a new parking
const createParking = async (req, res) => {
    try {
        const { vehiclePlate, entryTime, exitTime } = req.body;
        const parking = await Parking.create({ vehiclePlate, entryTime, exitTime });

        res.status(201).json({ parking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

// Get all parkings
const getParkings = async (req, res) => {
    try {
        const parkings = await Parking.findAll();
        res.json(parkings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Get parking by vehicle plate
const getParkingByVehiclePlate = async (req, res) => {
    try {
        const { vehiclePlate } = req.params;
        const parking = await Parking.findOne({ where: { vehiclePlate } });

        if (!parking) {
            return res.status(404).json({ message: 'Estacionamiento no encontrado' });
        }

        res.json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get parking by parkingId
const getParkingByParkingId = async (req, res) => {
    try {
        const { parkingId } = req.params;
        const parking = await Parking.findOne({ where: { parkingId } });

        if (!parking) {
            return res.status(404).json({ message: 'Estacionamiento no encontrado' });
        }

        res.json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Finish a parking
const finishParking = async (req, res) => {
    try {
        const { parkingId } = req.params;
        const parking = await Parking.findOne({ where: { parkingId } });

        if (!parking) {
            return res.status(404).json({ message: 'Estacionamiento no encontrado' });
        }

        parking.exitTime = new Date();
        parking.status = 'completed';
        await parking.save();

        res.json(parking);
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createParking, getParkings, getParkingByVehiclePlate, getParkingByParkingId, finishParking };