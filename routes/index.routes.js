const router = require("express").Router();
const Sequence = require("../models/Sequence.model.js");
const fileUploader = require('../config/cloudinary');
const User = require("../models/User.model"); 
const Image = require('../models/Image.model');

router.get("/", (req, res, next) => {
  Sequence.find()
    .then((sequences) => {
      res.render("index", { sequences });
      res.redirect("/auth/signup");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/rendered-participation", (req, res, next) => {
  res.render("renderedParticipation");
});

router.get("/playground/:sequenceId", (req, res, next) => {
  res.render("playground");
});


module.exports = router;
