const Renter = require('../models/renterModel');

const data =
    {
        email:  "vuongthanh1484@gmail.com",
        password:  "12345678",
        name:  "Thanh",
        phoneNumber: "0886662928"
    }

module.exports.renterSignup = async (req, res) => {
    const renter = new Renter(data);
   
    // try{
    //     console.log("start saving");
    //     await renter.save();
    //     console.log("end saving");
    //     res.send(renter);
    // }
    // catch(e) {
    //     res.send(e);
    // }

    try {
        await renter.save()
        const token = await renter.generateAuthToken()
        res.status(201).send({ renter, token })
        res.send(renter)
    } catch (e) {
        res.status(400).send(e)
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






