const mongoose = require("mongoose");

const publicLocation = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("rating", publicLocation);
