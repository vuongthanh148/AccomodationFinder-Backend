const express = require('express')
const router = new express.Router()
const Follow = require('../models/followModel');
const auth = require('../middleware/auth')

//Get All Location
router.get('/followList', auth, async (req,res) => {
    const _id = req.body._id;
    try{
      const list = await Follow.findOne({_id: _id});
      res.send(list.accommodation);

    }
    catch(e){
      console.log(e)
    }
})

//Add new Location
router.post('/followChange', async (req,res) => {
    console.log(req.body);
    const follow = await Follow.findOne({_id: req.owner.follow._id});
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