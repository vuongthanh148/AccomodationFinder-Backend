const express = require('express')
const Admin = require('../models/adminModel')
const Owner = require('../models/ownerModel')
const Follows = require('../models/followModel')
const Accommodation = require('../models/accommodationModel')
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')
const router = express.Router()

//helper function count like

const countLike = (idPost, listFollow) => {
  let result = 0
  for (let i = 0; i < listFollow.length; i++) {
    result += listFollow[i].accommodation.filter((a) => a === idPost).length
  }

  return result
}

router.post('/admin/signup', adminController.adminSignup)

router.post('/admin/login', adminController.adminLogin)

router.post('/admin/logout', auth, adminController.adminLogout)

router.get('/admin/profile', auth, adminController.adminProfile)

router.get('/admin/management-owner', async (req, res) => {
  try {
    let data = await Owner.find({}).select([
      'pending',
      'name',
      'address',
      'phoneNumber',
      'email',
    ])
    data = data.map((d) => {
      return {
        isApproved: !d.pending,
        name: d.name,
        address: d.address,
        phoneNumber: d.phoneNumber,
        email: d.email,
      }
    })
    res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Internal Server Error',
    })
  }
})

router.get('/admin/management-post', async (req, res) => {
  try {
    let data = await Accommodation.find({}).populate('rating')
    const listFollows = await Follows.find({})

    data = data.map((d) => {
      return {
        id: d._id,
        title: d.title,
        typeOfAccommodation: d.accommodationType,
        address: `${d.houseNumber} ${d.street}, ${d.ward}, ${d.district}, ${d.city}`,
        pricePerMonth: d.price,
        rating: { rate: d.rating.avgRate },
        watch: d.watch,
        isApproved: !d.pending,
        sumOfLike: countLike(d._id, listFollows),
      }
    })
    res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Internal Server Error',
    })
  }
})

module.exports = router
