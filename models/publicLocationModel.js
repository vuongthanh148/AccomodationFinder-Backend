const mongoose = require("mongoose");

const publicLocation = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model("location", publicLocation);
