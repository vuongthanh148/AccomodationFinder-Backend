const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rate: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
      },
      ratedDate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  avgRate: {
    type: Number
  }
});

ratingSchema.pre("save", function (next) {
  this.avgRate = this.rate.reduce((avg, r) => {
    return avg + r.stars / this.rate.length;
  }, 0);
  next();
});

module.exports = mongoose.model("rating", ratingSchema);
