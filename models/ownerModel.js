const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ownerSchema = mongoose.Schema(
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
    citizenId: {
      type: String,
      require: true,
      maxlength: 12,
      minlength: 9,
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
    follow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'follow'
    },
    pending: {
      type: Boolean,
      default: true,
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
      type: String,
      default: 'https://i.imgur.com/fTZerDj.png'
    },
  },
  {
    timestamps: true,
  }
);

ownerSchema.methods.generateAuthToken = async function () {
  const owner = this;
  const token = jwt.sign({ _id: owner._id.toString() }, "kenji");

  owner.tokens = owner.tokens.concat({ token });
  await owner.save();

  return token;
};

ownerSchema.statics.findByCredentials = async (email, password) => {
  const owner = await Owner.findOne({ email });

  if (!owner) {
    throw new Error("Cannot find email");
  }

  const isMatch = await bcrypt.compare(password, owner.password);

  if (!isMatch) {
    throw new Error("Wrong password");
  }

  return owner;
};

ownerSchema.pre("save", async function (next) {
  const owner = this;

  if (owner.isModified("password")) {
    owner.password = await bcrypt.hash(owner.password, 8);
  }

  next();
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
