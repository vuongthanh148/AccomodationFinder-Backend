const Accomod = require('../models/accommodationModel')
const Facilities = require('../models/facilitiesModel')
const Rating = require('../models/ratingModel')
const Comment = require('../models/commentModel')
const Owner = require('../models/ownerModel')
const Renter = require('../models/renterModel')
const Follow = require('../models/followModel')

module.exports.newAccomod = async (req, res) => {
  //Req has an user
  //Req.body: accomodInfo, facilitiesInfo, userUnfo = req.owner.info
  try {
    const facilities = new Facilities(req.body.facilitiesInfo)
    const accomod = new Accomod({
      ...req.body.accomodInfo,
      ownerId: req.body._id,
      ownerName: req.body.name,
      ownerPhone: req.body.phoneNumber,
      materialFacilities: facilities._id,
    })
    const rating = new Rating({
      accommodationId: accomod._id,
    })
    accomod.rating = rating._id
    // accomod.comment = comment._id

    
    await facilities.save()
    await rating.save()
    // await comment.save()
    await accomod.save()

    res.send(accomod)
  } catch (err) {
    console.log(err)
    if (err) {
      res.status(403).send(err)
    }
  }
}

module.exports.viewAccomodById = async (req, res) => {
  let accomod = await (await Accomod.findOne({ _id: req.params.id })).toObject()
  const facilities = await Facilities.findOne({
    _id: accomod.materialFacilities,
  })
  const comment = await Comment.findOne({ _id: accomod.comment })
  const rating = await Rating.findOne({ _id: accomod.rating })

  accomod.materialFacilities = facilities
  accomod.comment = comment
  accomod.avgRate = rating.avgRate
  // console.log('avgRate: ', accomod.avgRate)

  if (req.body.userId) {
    const follower = await Follow.findOne({ userId: req.body.userId })
    if (follower) {
      if (follower.accommodation.find((id) => id === accomod._id) !== undefined)
        accomod.followed = true
      else accomod.followed = false
    }
    const index = rating.rate.find((r) => r.userId === req.body.userId)
    accomod.ratedStar = rating.rate[index].stars
    console.log(accomod.ratedStar)
  }
  // console.log(accomod)
  res.send(accomod)
}

const flattenObject = function (ob) {
  var toReturn = {}

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (typeof ob[i] == 'object') {
      var flatObject = flattenObject(ob[i])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/Quan |Huyen |Thi Xa |Thanh Pho /g, '')
}

module.exports.searchAccomod = async (req, res) => {
  console.log(req.body)
  try {
    await Accomod.find(req.body.accommodationInfo)
      .populate('materialFacilities')
      .where('livingArea')
      .lte(req.body.livingArea)
      .where('price')
      .lte(req.body.price)
      .exec((err, allAccomod) => {
        if (allAccomod) {
          if (Object.keys(req.body.facilitiesInfo).length !== 0) {
            var newAccomodList = allAccomod.filter((accomod) => {
              for (const faci in req.body.facilitiesInfo) {
                if (faci === 'bathroom')
                  return (
                    accomod.materialFacilities[faci].seperate ==
                    req.body.facilitiesInfo[faci]
                  )
                if (faci == 'kitchen')
                  return (
                    accomod.materialFacilities[faci] ==
                    req.body.facilitiesInfo[faci]
                  )
                if (faci == 'airConditioner'){
                  console.log(req.body.facilitiesInfo)
                  console.log(accomod.materialFacilities[faci])
                    return (
                      accomod.materialFacilities[faci] ==
                      req.body.facilitiesInfo[faci]
                    )
                }
                if (faci == 'electricWaterHeater')
                  return (
                    accomod.materialFacilities[faci] ==
                    req.body.facilitiesInfo[faci]
                  )
              }
              return true
            })
            // console.log("newAccomod: ", newAccomodList.length)
            res.send({ allAccomod: newAccomodList })
          } else {
            res.send({ allAccomod })
            // console.log("newAccomod: ", allAccomod.length)
          }
          // else res.send(req.body)
        } else res.send('Not found')
      })
  } catch (e) {
    console.log(e)
  }
}

module.exports.viewAllAccomod = async (req, res) => {
  const id = req.body.userId;
  console.log(req.body)
  try {
    const list = await Accomod.find({ownerId: id}).populate('materialFacilities rating')
    if(list) {
      res.send(list)
    }
    else(list.send([]))
  }
  catch(e){
    console.log(e)
  }

};
