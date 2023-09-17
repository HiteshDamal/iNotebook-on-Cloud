const express = require('express')
const cors =require('cors')
const connectToMongo = require('./db')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
connectToMongo();