const Owner = require('../models/ownerModel');


module.exports.ownerSignup = async (req, res) => {
    const owner = new Owner(req.body);
    console.log("dcmm")
    try {
        console.log("start saving")
        await owner.save();
        const token = await owner.generateAuthToken()
        res.send("da xong :)")
    } catch (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              // Duplicate username
                res.status(422).send({ message: 'User already exist!' });
            }
            // Some other error
            res.status(422).send(err);
        }
    }
};

module.exports.ownerLogin = async (req, res) => {
    try {
        const owner = await Owner.findByCredentials(req.body.email, req.body.password)
        const token = await owner.generateAuthToken()
        res.send({ owner, token })
    } catch (e) {
        res.status(400).send("Wrong email or password")
    }
};

module.exports.ownerLogout = async (req, res) => {
    try {
        req.owner.tokens = req.owner.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.owner.save()

        res.send("Logout Successful")
    } catch (e) {
        res.status(500).send()
    }
};

module.exports.ownerLogoutAll = async (req, res) => {
    try {
        req.owner.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
};

module.exports.ownerProfile = async (req, res) => {
    res.send(req.owner)
};

module.exports.ownerUpdateProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'address']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.owner[update] = req.body[update])
        await req.owner.save()
        res.send(req.owner)
    } catch (e) {
        res.status(400).send(e)
    }
};

module.exports.ownerDeleteProfile = async (req, res) => {
    try {
        await req.owner.remove()
        res.send(req.owner)
    } catch (e) {
        res.status(500).send()
    }
};
