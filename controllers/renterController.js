const Renter = require('../models/renterModel');

module.exports.renterSignup = async (req, res) => {
    const renter = new Renter(req.body);
    res.send(renter);
    // try {
    //     await renter.save()
    //     const token = await renter.generateAuthToken()
    //     res.status(201).send({ renter })
    //     res.send(renter)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
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

        res.send()
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






