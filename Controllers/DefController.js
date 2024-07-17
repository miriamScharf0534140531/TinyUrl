import UsersModel from "../Models/UsersModel.js";

import bcrypt from 'bcryptjs';
import requestIp from 'request-ip';
import ip from 'ip';

import jwt from 'jsonwebtoken'
const DefController = {

    login: async (req, res) => {
        const { email, password } = req.body;
        // console.log("req.body", email, password);
        try {
            const user = await UsersModel.findOne({ email });
            if (!user) {
                res.status(401).send({ message: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send({ message: "Invalid credentials" });
            }
            const token = generateToken(user._id, user.name);
            res.json({ token, userId: user._id });
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
            console.log("ttttttttt::::::",token);
            res.json({ token,userId: newUser._id  });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    
  getById: async (req, res) => {
    try {
      const link = await LinksModel.findById(req.params.id);//שליפה לפי מזהה
      if (!link) {
        return res.status(404).json({ message: 'Link not found' });
      }
      let  clientIp = requestIp.getClientIp(req);
      if (clientIp && ip.isV6Format(clientIp)) {
        clientIp = ip.toString(ip.toBuffer(clientIp));
      }
      const click = {
        insertedAt: new Date(), 
        ipAddress: clientIp  
      };
      if (link.targetParamName && req.query[link.targetParamName]) {
        const targetName = req.query[link.targetParamName];
        click.targetParamValue=targetName;//1/2/3 מספר השלוחה
        const target = link.targetValues.find(target => target.name === targetName);
        if (target) {
            target.value += 1;
        }
        else{
          link.targetValues.push({name:targetName,value:1})
        }
    }
      link.clicks.push(click);
      await link.save();
      res.redirect(301, link.originalUrl);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },



}

const generateToken = (userId, userName) => {
    const token = jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
export default DefController;