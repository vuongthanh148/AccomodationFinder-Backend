const jwt = require('jsonwebtoken')
const Renter = require('../models/renterModel');
const Owner = require('../models/ownerModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'kenji')
        const renter = await Renter.findOne({ _id: decoded._id, 'tokens.token': token })
        const owner = await Owner.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!renter && !owner) {
            throw new Error()
        }

        req.token = token
        if(renter && !owner) req.renter = renter
        else if(!renter && owner) req.owner = owner
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth