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

router.patch('/renter/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.renter[update] = req.body[update])
        await req.renter.save()
        res.send(req.renter)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/renter/me', auth, async (req, res) => {
    try {
        await req.renter.remove()
        res.send(req.renter)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router