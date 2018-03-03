const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const app = express()

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080
mongoose.Promise = global.Promise

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
  mongoose
    .connect('mongodb://localhost:27017/quiz-learner')
    .then(() => {
      console.log('MongoDb is ready!')
    })

    // res.send('Hello from the server! This is home page')
    res.render('index')
})

app.listen(port, () => console.log(`Node.js server running on port ${port}...`))
