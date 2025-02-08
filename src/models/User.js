const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validación de formato de correo
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
    hooks: {
      beforeCreate: async (user) => { 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
       }
  }
});

User.prototype.comparePassword = function () {
  return bcrypt.compare(password, this.password);  
}

module.exports = User;
