const jwt = require('jsonwebtoken')
const Renter = require('../models/renterModel');
const Owner = require('../models/ownerModel');
const Admin = require('../models/adminModel');

const auth = async (req, res, next) => {//Get Token in header and add user to req
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        const decoded = jwt.verify(token, 'kenji')
        const renter = await Renter.findOne({ _id: decoded._id, 'tokens.token': token })
        const owner = await Owner.findOne({ _id: decoded._id, 'tokens.token': token })
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!renter && !owner && !admin) {
            throw new Error()
        }

        req.token = token
        if(renter) req.renter = renter
        else if(owner) req.owner = owner
        else if(admin) req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth