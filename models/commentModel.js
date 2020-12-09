const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      userName:{
        type: String,
        required: true
      },
      body: {
        type: String,
        require: true,
      },
      commentDate: {
        type: Date,
        default: Date.now(),
      },
      pending: {
        type: Boolean,
        default: true,
      },
    },
  ],
});
//Pre save send notification

module.exports = mongoose.model("comment", commentSchema);
