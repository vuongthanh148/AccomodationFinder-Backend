const Admin = require('../models/adminModel');


module.exports.adminSignup = async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();

        // await admin.save();
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
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

module.exports.adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send("Wrong email or password")
    }
};

module.exports.adminLogout = async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send("Logout Successful")
    } catch (e) {
        res.status(500).send()
    }
};

module.exports.adminProfile = async (req, res) => {
    res.send(req.admin)
};







