const express = require('express')
const Owver = require('../models/ownerModel')
const auth = require('../middleware/auth')
const ownerController = require('../controllers/ownerController');
const router = new express.Router()

router.post('/owner/signup', ownerController.ownerSignup)

router.post('/owner/login', ownerController.ownerLogin)

router.post('/owner/logout', auth, ownerController.ownerLogout)

router.post('/owner/logoutAll', auth, ownerController.ownerLogoutAll)

router.get('/owner/profile', auth, ownerController.ownerProfile)

router.patch('/owner/profile', auth, ownerController.ownerUpdateProfile)

router.delete('/owner/profile', auth, ownerController.ownerDeleteProfile)

module.exports = router