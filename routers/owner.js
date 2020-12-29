const express = require('express')
const Owner = require('../models/ownerModel')
const auth = require('../middleware/auth')
const ownerController = require('../controllers/ownerController')
const router = new express.Router()

router.post('/owner/signup', ownerController.ownerSignup)

router.post('/owner/login', ownerController.ownerLogin)

router.post('/owner/logout', auth, ownerController.ownerLogout)

router.post('/owner/logoutAll', auth, ownerController.ownerLogoutAll)

router.get('/owner/profile', auth, ownerController.ownerProfile)

router.get('/owner/pending', ownerController.ownerPending)

router.post('/owner/profile', auth, ownerController.ownerUpdateProfile)

router.patch('/owner/approve', ownerController.ownerApprove)

router.delete('/owner/profile/:email', ownerController.ownerDeleteProfile)

router.post('/owner/follow', auth, ownerController.followChange)

router.post('/owner/profile/avatar', auth, async (req, res) => {
  console.log(req.body.avatar) // Avatar link from frontend
  req.owner.avatar = req.body.avatar
  await req.renter.save()
  res.send('change avatar successful')
})

router.delete('/owner/profile/avatar', auth, async (req, res) => {
  req.owner.avatar = undefined
  await req.owner.save()
  res.send()
})

router.get('/owner/:id/avatar', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id)

    if (!owner || !owner.avatar) {
      throw new Error()
    }
    res.send(owner.avatar)
  } catch (e) {
    console.log(e)
    res.status(404).send(e)
  }
})

module.exports = router
