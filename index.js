const port = 8080
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from the server! This is home page')
})

app.listen(port, () => console.log(`Node.js server running on port ${port}`))
