const express = require('express')
const auth = require('../middleware/auth')
const accomodController = require('../controllers/accommodationController')
const Accommodation = require('../models/accommodationModel')
const Comment = require('../models/commentModel')
const router = express.Router()

router.post('/accommodation/newAccomod', auth, accomodController.newAccomod)

router.post('/accommodation', accomodController.viewAccomod)

router.get('/accommodation/:id', accomodController.viewAccomodById)

router.put('/accommodation/approve', async (req, res) => {
  const { accommodationId } = req.body
  try {
    const accommodation = await Accommodation.findById(accommodationId)
    console.log(accommodation)
    accommodation.pending = false
    console.log(accommodation.pending)
    await accommodation.save()
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

router.delete('/accommodation/:id', async (req, res) => {
  const { id: accommodationId } = req.params
  console.log(req.params)
  try {
    const accommodation = await Accommodation.findById(accommodationId)
    const listComment = await Comment.find({ accommodationId })
    if (listComment.length !== 0) {
      listComment.forEach(async (comment) => {
        await comment.remove()
      })
    }

    await accommodation.remove()
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

router.post('/accommodation/analyst', async (req, res) => {
  const { accommodationId } = req.body
  try {
    const accommodation = await Accommodation.findById(accommodationId)
    accommodation.watch++
    await accommodation.save()
    res.json({
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
