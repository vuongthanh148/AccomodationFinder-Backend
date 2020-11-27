const express = require("express");
const Renter = require("../models/renterModel");
const auth = require("../middleware/auth");
const sharp = require("sharp");
const renterController = require("../controllers/renterController");
const upload = require("../middleware/multer");
const router = new express.Router();
const fs = require("fs");
const axios = require("axios");
var FormData = require("form-data");

router.post("/renter/signup", renterController.renterSignup);

router.post("/renter/login", renterController.renterLogin);

router.post("/renter/logout", auth, renterController.renterLogout);

router.post("/renter/logoutAll", auth, renterController.renterLogoutAll);

router.get("/renter/profile", auth, renterController.renterProfile);

router.patch("/renter/profile", auth, renterController.renterUpdateProfile);

router.delete("/renter/profile", auth, renterController.renterDeleteProfile);

router.post("/renter/profile/avatar", auth, async (req, res) => {
  // console.log('new Avatar: ',req.body.avatar)
  console.log(req.body.avatar)
  res.send(req.body.avatar)
});

router.delete("/renter/profile/avatar", auth, async (req, res) => {
  req.renter.avatar = undefined;
  await req.renter.save();
  res.send();
});

router.get("/renter/:id/avatar", async (req, res) => {
  try {
    const renter = await Renter.findById(req.params.id);

    if (!renter || !renter.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(renter.avatar[0]);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
