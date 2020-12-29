const express = require('express')
const router = new express.Router()
const Rating = require('../models/ratingModel')
const auth = require('../middleware/auth')


router.post('/rating', auth, async (req, res) => {
  console.log(req.body)
  const tempRating = await Rating.findOne({accommodationId: req.body.accommodationId})
  if(tempRating.rate.find(x => x.userId === req.body.userId) != undefined){
      tempRating.rate[tempRating.rate.find(x => x.userId === req.body.userId)].stars = req.body.ratedStar
  }
  else tempRating.rate.push({
      userId: req.body.userId,
      stars: req.body.ratedStar,
      ratedDate: Date.now()
  })
  try {
    await tempRating.save();
    res.status(200).send('Đánh giá thành công')
  } catch (e) {
    console.log(e)
  }
})



module.exports = router
