const express = require('express')
const router = new express.Router()
const Follow = require('../models/followModel');
const auth = require('../middleware/auth')

//Get All Location
router.post('/followList', auth, async (req,res) => {
    console.log(req.body)
    const _id = req.body._id;
    try{
      const list = await Follow.findOne({userId: _id});
      if(list) res.send(list.accommodation);
      else res.send([])
    }
    catch(e){
      console.log(e)
    }
})

//Add new Location
router.post('/followChange', async (req,res) => {
    console.log(req.body);
    const follow
    if(req.owner) follow = await Follow.findOne({_id: req.owner.follow._id});
    if(req.renter) follow = await Follow.findOne({_id: req.renter.follow._id});
    try {
      const index = follow.accommodation.indexOf(req.body.accomodId);
  
      if(index !== -1){ //exist
        follow.accommodation.splice(index,1);
        await follow.save();
        res.send({isFollowed: false})
      }
      else{
        follow.accommodation.push(req.body.accomodId);
        await follow.save();
        res.send({isFollowed: true})
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
})



module.exports = router