const express = require('express')
const router = new express.Router()
const Follow = require('../models/followModel');

//Get All Location
router.get('/followList', auth, async (req,res) => {
    const _id = req.data._id;
    const list = await Follow.findOne({_id: _id});
    res.send(list.accommodation);
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