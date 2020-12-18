const Renter = require("../models/renterModel");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vuongthanh148@gmail.com",
    pass: "efaewfkjbddepqpy",
  },
});
module.exports.renterSignup = async (req, res) => {
  const renter = new Renter(req.body);
  try {
    await renter.save();
    // const token = await renter.generateAuthToken()
    const objectRenter = renter.toObject();
    delete objectRenter.password;

    var mailOptions = {
      from: "vuongthanh148@gmail.com",
      to: objectRenter.email,
      subject: "Tạo tài khoản Easy Accomod",
      text:
        "Bạn đã tạo tài khoản thành công. Đăng nhập ngay để bắt đầu tìm kiếm những ngôi nhà tốt nhất dành cho bạn",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({
          objectRenter,
          response:
            "Đăng ký thành công.",
        });
      }
    });
  } catch (err) {
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

module.exports.renterLogin = async (req, res) => {
  try {
    const renter = await Renter.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await renter.generateAuthToken();
    res.send({ renter, token });
  } catch (e) {
    res.status(400).send("Wrong email or password");
  }
};

module.exports.renterLogout = async (req, res) => {
  try {
    req.renter.tokens = req.renter.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.renter.save();

    res.send("Logout Successful");
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.renterLogoutAll = async (req, res) => {
  try {
    req.renter.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports.renterProfile = async (req, res) => {
  res.send(req.renter);
};

module.exports.renterUpdateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.renter[update] = req.body[update]));
    await req.renter.save();
    res.send(req.renter);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.renterDeleteProfile = async (req, res) => {
  try {
    await req.renter.remove();
    res.send(req.renter);
  } catch (e) {
    res.status(500).send();
  }
};
