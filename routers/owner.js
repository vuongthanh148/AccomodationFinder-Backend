const express = require('express')
const Owner = require('../models/ownerModel')
const multer = require('multer')
const sharp = require('sharp')
const upload = require('../middleware/multer')
const auth = require('../middleware/auth')
const ownerController = require('../controllers/ownerController');
const router = new express.Router()

router.post('/owner/signup', ownerController.ownerSignup)

router.post('/owner/login', ownerController.ownerLogin)

router.post('/owner/logout', auth, ownerController.ownerLogout)

router.post('/owner/logoutAll', auth, ownerController.ownerLogoutAll)

router.get('/owner/profile', auth, ownerController.ownerProfile)

router.get('/owner/pending', ownerController.ownerPending)

router.patch('/owner/profile', auth, ownerController.ownerUpdateProfile)

router.patch('/owner/approve', ownerController.ownerApprove)

router.delete('/owner/profile', auth, ownerController.ownerDeleteProfile)

router.post('/owner/profile/avatar', auth, upload.array('avatar',1), async (req, res) => {
    console.log(req.files.length)
     for(f of req.files){
        const buffer = await sharp(f.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        req.owner.avatar.push(buffer)
    }
    await req.owner.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
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
        res.set('Content-Type', 'image/png')
        res.send(owner.avatar[0])
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
})

module.exports = router