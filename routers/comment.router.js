const express = require('express')
const auth = require('../middleware/auth')
const Comment = require('../models/commentModel')
const router = express.Router()

router.post('/get-all-comments', async (req, res) => {
  const { accommodationId } = req.body
  try {
    const data = await Comment.find({
      accommodationId,
      pending: false,
    }).populate('userId', 'name avatar')
    res.json({
      success: true,
      comments: data.map((d) => {
        return {
          ...d._doc,
          userInfo: d.userId,
        }
      }),
      total: data.length,
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

router.get('/get-all-comments', async (req, res) => {
  try {
    const data = await Comment.find({}).populate('userId', 'name avatar')
    res.json({
      success: true,
      total: data.length,
      comments: data.map((d) => {
        const record = {
          ...d._doc,
          userInfo: d.userId,
        }
        delete record.userId
        return record
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

router.put('/approve-comment', async (req, res) => {
  const { commentId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    comment.pending = false
    await comment.save()
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
    })
  }
})

router.delete('/delete-comment', async (req, res) => {
  const { commentId } = req.body
  // if (!req.admin) {
  //   res.status(403).json({
  //     success: false,
  //     message: 'You are not admin',
  //   })
  //   return
  // }
  try {
    await Comment.findByIdAndDelete(commentId)
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
    })
  }
})

module.exports = router
