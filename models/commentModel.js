const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    accommodationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'accommodation',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'renter',
    },
    content: {
      type: String,
      require: true,
    },
    pending: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
)
//Pre save send notification

module.exports = mongoose.model('comment', commentSchema)
