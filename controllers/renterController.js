const Renter = require('../models/renterModel');
const fs = require('fs');
const sharp = require('sharp');


module.exports.renterSignup = async (req, res) => {
    var imgBinary = fs.readFileSync('cat250.png');
    imgBinary = await sharp(imgBinary).resize({ width: 250, height: 250 }).png().toBuffer();
    const renter = new Renter(req.body);
    renter.avatar.push(imgBinary);
    try {
        await renter.save();
        // await renter.save();
        const token = await renter.generateAuthToken()
        res.status(201).send({ renter, token })
    } catch (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              // Duplicate username
                res.status(422).send({ message: 'User already exist!' });
            }
      
            // Some other error
            else res.status(422).send(err);
        }
    }
};

module.exports.renterLogin = async (req, res) => {
    try {
        const renter = await Renter.findByCredentials(req.body.email, req.body.password)
        const token = await renter.generateAuthToken()
        res.send({ renter, token })
    } catch (e) {
        res.status(400).send("Wrong email or password")
    }
};

module.exports.renterLogout = async (req, res) => {
    try {
        req.renter.tokens = req.renter.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.renter.save()

        res.send("Logout Successful")
    } catch (e) {
        res.status(500).send()
    }
};

module.exports.renterLogoutAll = async (req, res) => {
    try {
        req.renter.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
};

module.exports.renterProfile = async (req, res) => {
    res.send(req.renter)
};

module.exports.renterUpdateProfile = async (req, res) => {
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
};

module.exports.renterDeleteProfile = async (req, res) => {
    try {
        await req.renter.remove()
        res.send(req.renter)
    } catch (e) {
        res.status(500).send()
    }
};






