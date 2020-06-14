'use strict'

const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const Game = require('./models/game');

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
app.set('view engine', 'pug');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

let game = {}

app.get('/games', async (req, res) => {
  let games = await Game.find({})
  games = games.sort((b, a) => (a.game.money + a.game.moneySpent) - (b.game.money+ b.game.moneySpent))
  res.render('games', { games })
})

app.post('/games', async (req, res) => {
  let { body } = req
  let game = await Game.findOne({id: body.id})
  if (game) {
    game.businesses = body.businesses
    game.game = body.game
    game.character = body.character
    game.tutorial = body.tutorial
  } else {
    game = new Game(body)
  }

  try {
    await game.save()
    res.status(201).json({id: game.id})
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

app.get('/games/:id', async (req, res) => {
  let { id } = req.params
  try {
    let game = await Game.findOne({id: id})
    if (!game) {
      return res.status(404).json({})
    }
    res.status(201).json(game)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

app.get('/', (req, res) => {
  res.render('game')
})



app.use((err, req, res, next) => {
  console.error(err)
  res.json({msg: 'w'})
})

module.exports = app;