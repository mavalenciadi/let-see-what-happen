const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parking = sequelize.define('Parking', { 
    parkingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entryTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exitTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('in-progress', 'completed'),
        defaultValue: 'in-progress'
    }
});