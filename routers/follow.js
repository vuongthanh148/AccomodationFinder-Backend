const express = require('express')
const router = new express.Router()
const Follow = require('../models/followModel')
const auth = require('../middleware/auth')

//Get All Location
router.post('/followList', auth, async (req, res) => {
  console.log(req.body)
  const _id = req.body._id
  try {
    const list = await Follow.find({ userId: _id })
    if (list) res.send(list)
    else res.send([])
  } catch (e) {
    console.log(e)
  }
})

router.post('/followChange', auth, async (req, res) => {
  console.log(req.body)
  const tempFollow = await Follow.find({
    userId: req.user_id,
    accommodationId: req.body.accomodId,
  })
  if (tempFollow)
    const follow = new Follow({
      userId: req.user._id,
      accommodationId: req.body.accomodId,
    })
  try {
    await follow.save()
    res.status(200).send('Đăng ký thành công')
  } catch (e) {
    console.log(e)
    res.status(400)
  }
})

module.exports = router
