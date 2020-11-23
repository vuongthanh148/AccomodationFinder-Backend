const express = require('express')
const Renter = require('../models/renterModel')
const multer = require('multer')
const sharp = require('sharp')
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

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/renter/profile/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.renter.avatar = buffer
    console.log(buffer)
    await req.renter.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/renter/profile/avatar', auth, async (req, res) => {
    req.renter.avatar = undefined
    await req.renter.save()
    res.send()
})

router.get('/renter/:id/avatar', async (req, res) => {
    try {
        const renter = await Renter.findById(req.params.id)

        if (!renter || !renter.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(renter.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router