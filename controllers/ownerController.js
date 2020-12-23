const Owner = require("../models/ownerModel");
const Follow = require("../models/followModel");
const nodemailer = require("nodemailer");
const followModel = require("../models/followModel");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vuongthanh148@gmail.com",
    pass: "efaewfkjbddepqpy",
  },
});

module.exports.ownerSignup = async (req, res) => {
  const owner = new Owner(req.body);
  const newFollow = new Follow({userId: owner._id});
  owner.follow = newFollow._id;
  console.log(owner)
  try {
    await owner.save();
    await newFollow.save();
    const objectOwner = owner.toObject();
    delete objectOwner.password;
    // const token = await owner.generateAuthToken()
    var mailOptions = {
      from: "vuongthanh148@gmail.com",
      to: objectOwner.email,
      subject: "Tạo tài khoản Easy Accomod",
      text:
        "Bạn đã tạo tài khoản thành công. Vui lòng chờ trong khi chúng tôi xác minh tài khoản của bạn. Bạn sẽ nhận được email thông báo khi chúng tôi xác minh thành công",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({
          objectOwner,
          response:
            "Đăng ký thành công, vui lòng chờ chúng tôi xác minh tài khoản của bạn.",
        });
      }
    });
    // res.send({objectOwner, message: "dcmm"});
  } catch (err) {
    console.log(err);
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        // Duplicate username
        res.send({ message: "User already exist!" });
      }
      // Some other error
      else res.send(err);
    }
  }
};

module.exports.ownerLogin = async (req, res) => {
  try {
    const owner = await Owner.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await owner.generateAuthToken();
    res.send({ owner, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.ownerLogout = async (req, res) => {
  try {
    req.owner.tokens = req.owner.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.owner.save();

    res.send({ message: "Logout Successful" });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.ownerLogoutAll = async (req, res) => {
  try {
    req.owner.tokens = [];
    await req.owner.save();
    res.send({ message: "Logout Successful" });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.ownerProfile = async (req, res) => {
  res.send(req.owner);
};

module.exports.ownerUpdateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "address",
    "phoneNumber",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.owner[update] = req.body[update]));
    await req.owner.save();
    res.send(req.owner);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.ownerDeleteProfile = async (req, res) => {
  try {
    await req.owner.remove();
    res.send({ message: "Delete Account Successful" });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.ownerPending = async (req, res) => {
  try {
    const listOwner = await Owner.find({ pending: true });
    res.send(listOwner);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.ownerApprove = async (req, res) => {
  try {
    const owner = await Owner.findOneAndUpdate(
      { email: req.body.email },
      { pending: "false" }
    );
    console.log(owner);
    res.send(owner);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
