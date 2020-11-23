const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const renterSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    // phoneNumber: {
    //   type: String,
    //   required: true,
    //   match: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})/,
    // },
    follow: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

renterSchema.methods.generateAuthToken = async function () {
  const renter = this;
  const token = jwt.sign({ _id: renter._id.toString() }, "kenji");

  renter.tokens = renter.tokens.concat({ token });
  await renter.save();

  return token;
};

renterSchema.statics.findByCredentials = async (email, password) => {
  const renter = await Renter.findOne({ email });

  if (!renter) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, renter.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return renter;
};

renterSchema.pre("save", async function (next) {
  const renter = this;

  if (renter.isModified("password")) {
    renter.password = await bcrypt.hash(renter.password, 8);
  }

  next();
});

const Renter = mongoose.model("Renter", renterSchema);

module.exports = Renter;
