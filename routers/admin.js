const express = require('express')
const Admin = require('../models/adminModel')
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController');
const router = new express.Router()

router.post('/admin/signup', adminController.adminSignup)

router.post('/admin/login', adminController.adminLogin)

router.post('/admin/logout', auth, adminController.adminLogout)

module.exports = router