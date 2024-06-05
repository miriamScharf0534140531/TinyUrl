import express from 'express'  
import connectDB from './database.js'
import LinksRouter from './Routers/LinksRouter.js'
import UsersRouter from './Routers/UsersRouter.js'


// import dotenv from 'dotenv';
import cors from "cors"
import bodyParser from "body-parser"

connectDB();
// dotenv.config();
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000
app.use('/users', UsersRouter)
app.use('/links',LinksRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

  