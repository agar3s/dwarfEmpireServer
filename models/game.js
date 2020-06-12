const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const GameSchema = new Schema({
  id: { type: String, required: true, unique: true },
  game: { type: Object },
  tutorial: { type: Object },
  character: { type: Object },
  businesses: { type: Object },
})

const Game = mongoose.model('Games', GameSchema)
module.exports = Game
