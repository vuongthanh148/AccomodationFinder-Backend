const jwt = require('jsonwebtoken')
const Renter = require('../models/renterModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'kenji')
        const renter = await Renter.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!renter) {
            throw new Error()
        }

        req.token = token
        req.renter = renter
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth