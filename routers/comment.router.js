const express = require('express')
const auth = require('../middleware/auth')
const Comment = require('../models/commentModel')
const router = express.Router()

router.post('/get-all-comments', async (req, res) => {
  const { accommodationId } = req.body
  try {
    const data = await Comment.find({ accommodationId }).populate(
      'userId',
      'name avatar'
    )
    res.json({
      success: true,
      comments: data.map((d) => {
        return {
          ...d._doc,
          userInfo: d.userId,
        }
      }),
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

router.post('/create-new-comment', auth, async (req, res) => {
  try {
    const renderId = req.renter._id
    const { content, accommodationId } = req.body
    const newComment = new Comment({
      userId: renderId,
      content,
      accommodationId,
    })
    const result = await newComment.save()
    res.json({
      success: true,
      comment: {
        ...result._doc,
        avatar: req.renter.avatar,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

module.exports = router
