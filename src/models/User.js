const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
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
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  }
},{
    hooks: {
      beforeCreate: async (user) => { 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
       }
  }
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);  
}

User.prototype.toJSON = function () {
  let values = { ...this.get() };
  delete values.password; // Oculta la contraseña
  return values;
};

module.exports = User;
