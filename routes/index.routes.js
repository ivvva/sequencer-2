const router = require("express").Router();
const Sequence = require("../models/Sequence.model.js");
const { uploader, cloudinary } = require("../config/cloudinary");
const User = require("../models/User.model.js");

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

router.get("sequence/add", (req, res, next) => {
  res.render("rendered-participation");
});

router.get("/sequence/delete/:id", (req, res, next) => {
  Sequence.findByIdAndDelete(req.params.id)
    .then((deletedSequence) => {
      if (deletedSequence.imgPath) {
        cloudinary.uploader.destroy(deletedSequence.publicId);
      }
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/sequences", uploader.single("image"), (req, res, next) => {
  console.log(req.file);
  const { notes, drawingX, drawingY } = req.body;
  const imageName = req.file.originalname;
  const imageId = req.file.id;
  const imageUrl = req.file.filename;
  Sequence.create({ notes, drawing, imageName, imageId, imageUrl })
    .then((sequence) => {
      console.log(sequence);
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/participation-history", (req, res, next) => {
  User.find()
    .then((allTheUsersFromDB) => {
      console.log("Retrieved users from DB:", allTheUsersFromDB);
      res.render("participationHistory", { users: allTheUsersFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the users from the DB: ", error);
      next(error);
    });
});

router.get("/playground/:sequenceId", (req, res, next) => {
  res.render("playground");
});

module.exports = router;
