import UsersModel from "../Models/UsersModel.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const DefController = {

    login: async (req, res) => {
        const { email, password } = req.body;
        console.log("req.body", email, password);
        try {
            const user = await UsersModel.findOne({ email, password });
            if (!user) {
                res.status(401).send({ message: "Invalid credentials" });
            }
            const token = generateToken(user._id, user.name);
            res.json({ token });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    },

    register: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const existingUser = await UsersModel.findOne({ email });// בדיקה אם המשתמש כבר קיים
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const salt = await bcrypt.genSalt(10);// הצפנת הסיסמה
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new UsersModel({ name, email, password: hashedPassword });// יצירת משתמש חדש ושמירתו בבסיס הנתונים
            await newUser.save();
            const token = generateToken(newUser._id, newUser.name);
            res.json({ token });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }


}

const generateToken = (userId, userName) => {
    const token = jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
export default DefController;