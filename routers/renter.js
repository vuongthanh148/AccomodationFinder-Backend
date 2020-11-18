const express = require('express')
const Renter = require('../models/renterModel')
const auth = require('../middleware/auth')
const renterController = require('../controllers/renterController');
const router = new express.Router()

router.post('/renter/signup', renterController.renterSignup)

router.post('/renter/login', renterController.renterLogin)

router.post('/renter/logout', auth, renterController.renterLogout)

router.post('/renter/logoutAll', auth, renterController.renterLogoutAll)

router.get('/renter/profile', auth, renterController.renterProfile)

router.patch('/renter/profile', auth, renterController.renterUpdateProfile)

router.delete('/renter/profile', auth, renterController.renterDeleteProfile)

module.exports = router