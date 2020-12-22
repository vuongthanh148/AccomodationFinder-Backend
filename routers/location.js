const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const publicLocation = require('../models/publicLocationModel');

//Get All Location
router.get('/location',async (req,res) => {
    const allLocation = await publicLocation.find();
    res.send(allLocation);
})

//Add new Location
router.post('/location/new',async (req,res) => {
    try{
        const newLocation = new publicLocation(req.body.location);
        await newLocation.save();
        res.send();
    }
    catch(e) {
        res.send(e)
    }
})



module.exports = router