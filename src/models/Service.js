const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');   
const { stat } = require('fs');
const { privateName } = require('@babel/types');

// Define service model
const Service = sequelize.define('Service', {
    vehiclePlate: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle'),
        allowNull: false
    },
    service: {
        type: DataTypes.ENUM('parking-all-day', 'partial-parking', 'washing'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('in-progress', 'completed'),
        defaultValue: 'in-progress'
    }
});

User.hasMany(Service, { foreignKey: 'id', onDelete: 'CASCADE' });
Service.belongsTo(User, { foreignKey: 'id' });

module.exports = Service;

