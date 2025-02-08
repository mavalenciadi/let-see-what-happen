const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ user, token });
    } catch (error) { 
        res.status(500).json({ message: error.message });
    };
};

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

module.exports = { register, login };