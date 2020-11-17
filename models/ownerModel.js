const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  citizenId: {
    type: Number,
    require: true,
    max: 12,
    min: 9,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})/,
  },
  pending: {
      type: Boolean,
      require: true,
      default: true,
  }
});



module.exports = mongoose.model("owner", ownerSchema);
