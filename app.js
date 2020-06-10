'use strict'

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const connectRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    reconnectTries: 30,
    reconnectInterval: 1000,
    poolSize: 500,
  }, (err) => {
    if (err) {
      console.log('Mongoose connection error:', err)
      setTimeout(connectRetry, 5000)
    }
  })
}

connectRetry()

app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/games', (req, res) => {

});

module.exports = app;