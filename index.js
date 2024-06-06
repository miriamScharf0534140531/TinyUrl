import express from 'express'  
import connectDB from './database.js'
import LinksRouter from './Routers/LinksRouter.js'
import UsersRouter from './Routers/UsersRouter.js'
import DefRouter from './Routers/DefRouter.js'

import dotenv from 'dotenv';
import cors from "cors"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken";

connectDB();
dotenv.config();
const app = express()
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
const port = 3000


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.slice(7);
  if (!token) {
    return res.sendStatus(401); // אם אין טוקן, שלח שגיאה 401
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // אימות הטוקן
    req.user = { userId: decoded.userId }; 
    next();
  } catch (err) {
    return res.sendStatus(403); // אם הטוקן לא תקף, שלח שגיאה 403
  }
};

app.use('/',DefRouter)
app.use('/users',authenticateToken, UsersRouter)
app.use('/links',authenticateToken,LinksRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

  