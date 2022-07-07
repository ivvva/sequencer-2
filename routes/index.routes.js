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

router.get("/sequence/delete/:id", (req, res, next) => {
  Sequence.findByIdAndDelete(req.params.id)
    .then((deletedSequence) => {
      if (deletedSequence.imgPath) {
        cloudinary.fileUploader.destroy(deletedSequence.publicId);
      }
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

// for cloudinary
router.post("/sequences", fileUploader.single("image"), (req, res) => {
  console.log(req.file);
  const { notes, drawingX, drawingY } = req.body;
  // const imageName = req.file.originalname;
  // const imageId = req.file.id;
  const imageUrl = req.file.path;
  Sequence.create({ notes, drawingX, drawingY, imageUrl: req.file.path })
    .then((sequence) => {
      console.log(sequence);
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/playground/:sequenceId", (req, res, next) => {
  res.render("playground");
});


module.exports = router;
