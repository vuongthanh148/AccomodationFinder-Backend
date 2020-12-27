const express = require('express')
const auth = require('../middleware/auth')
const accomodController = require('../controllers/accommodationController')
const router = express.Router()

router.post('/accommodation/newAccomod', auth, accomodController.newAccomod)

router.post('/accommodation', accomodController.viewAccomod)

router.get('/accommodation/:id', accomodController.viewAccomodById)

module.exports = router
