const Renter = require('../models/renterModel')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vuongthanh148@gmail.com',
    pass: 'efaewfkjbddepqpy',
  },
})
module.exports.renterSignup = async (req, res) => {
  const renter = new Renter(req.body)
  const newFollow = new Follow({ userId: renter._id })
  renter.follow = newFollow._id
  console.log(renter)
  try {
    await renter.save()
    // const token = await renter.generateAuthToken()
    await newFollow.save()

    const objectRenter = renter
    delete objectRenter.password

    var mailOptions = {
      from: 'vuongthanh148@gmail.com',
      to: objectRenter.email,
      subject: 'Tạo tài khoản Easy Accomod',
      text:
        'Bạn đã tạo tài khoản thành công. Đăng nhập ngay để bắt đầu tìm kiếm những ngôi nhà tốt nhất dành cho bạn',
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error)
      } else {
        console.log('Email sent: ' + info.response)
        res.send({
          objectRenter,
          response: 'Đăng ký thành công.',
        })
      }
    })
  } catch (err) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        res.send({ message: 'User already exist!' })
      }
      // Some other error
      else res.send(err)
    }
  }
}

module.exports.renterLogin = async (req, res) => {
  try {
    const renter = await Renter.findByCredentials(
      req.body.email,
      req.body.password
    )
    const token = await renter.generateAuthToken()
    res.send({ user: renter, token })
  } catch (e) {
    console.log(e.message)
    res.status(401)
    res.send(e.message)
  }
}

module.exports.renterLogout = async (req, res) => {
  try {
    req.renter.tokens = req.renter.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.renter.save()

    res.send('Logout Successful')
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.renterLogoutAll = async (req, res) => {
  try {
    req.renter.tokens = []
    await req.renter.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.renterProfile = async (req, res) => {
  res.send(req.renter)
}

module.exports.renterUpdateProfile = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach((update) => (req.renter[update] = req.body[update]))
    await req.renter.save()
    res.send(req.renter)
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports.renterDeleteProfile = async (req, res) => {
  try {
    await req.renter.remove()
    res.send(req.renter)
  } catch (e) {
    res.status(500).send()
  }
}

module.exports.followChange = async (req, res) => {
  const follow = await Follow.findOne({ _id: req.renter.follow._id })
  try {
    const index = follow.accommodation.indexOf(req.body.accomodId)

    if (index !== -1) {
      //exist
      follow.accommodation.splice(index, 1)
      await follow.save()
      res.send({ isFollowed: false })
    } else {
      follow.accommodation.push(req.body.accomodId)
      await follow.save()
      res.send({ isFollowed: true })
    }
  } catch (e) {
    console.log(e)
    res.send(e)
  }
}
