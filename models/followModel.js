const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
})
//Pre save send notification

module.exports = mongoose.model('follow', followSchema)
