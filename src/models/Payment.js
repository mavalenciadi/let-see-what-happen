const DataTypes = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle'),
        allowNull: false,
        references: {
            model: 'Service',
            key: 'vehicleType'
        }
    },
    ServiceType: {
        type: DataTypes.ENUM('parking', 'washing'),
        allowNull: false,
        references: {
            model: 'Service',
            key: 'service'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});