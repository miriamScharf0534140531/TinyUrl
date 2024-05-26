import express from 'express'  
import connectDB from './database.js'
connectDB();
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

app.get("/tasks", (req, res) => {
    res.send([
      { id: 1, name: "task 1", status: "TODO" },
      { id: 2, name: "task 2", status: "Done" },
    ]);
  });
  