const express = require('express')
const router = new express.Router()
const publicLocation = require('../models/publicLocationModel');

//Get All Location
router.get('/location',async (req,res) => {
    const allLocation = await publicLocation.find();
    if(allLocation) res.status(200).send(allLocation);
    else res.status(401)
})

//Add new Location
router.post('/location/new', async (req,res) => {
    console.log(req.body);
    try{
        const newLocation = new publicLocation(req.body);
        await newLocation.save();
        res.send(newLocation);
    }
    catch(e) {
        if(e.code === "11000") res.send("duplicate location")
        else res.send(e)
    }
})



module.exports = router