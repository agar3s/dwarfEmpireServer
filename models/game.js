const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const GameSchema = new Schema({
  id: { type: String, required: true, unique: true },
  money: { type: String, required: true },
  businesses: { type: Object },
})

const Game = mongoose.model('Games', GameSchema)
module.exports = Game
