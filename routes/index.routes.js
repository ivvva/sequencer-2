const router = require("express").Router();
const Sequence = require("../models/Sequence") 
const {uploader, cloudinary} = require("../config/cloudinary"); 

/* GET home page */
router.get("/", (req, res, next) => {
  Sequence.find().then(sequences => { 
    res.render("index", { sequences })
  }).catch(err => { next(err) })
}); 

router.get("sequence/add", (req, res, next) => {
  res.render("sequence-add") // change name to existing-composition
});

router.get("/sequence/delete/:id", (req, res, next) => {
  Sequence.findByIdAndDelete(req.params.id)
  .then(deletedSequence => {
    if (deletedSequence.imgPath) {
      // delete the image on cloudinary 
      cloudinary.uploader.destroy(deletedSequence.publicId)
    }
    res.redirect("/")
  })
  .catch(err => { next(err) })
});

router.post("/sequences", uploader.single("image"), (req, res, next) => {
  console.log(req.file) 
  const { title, description } = req.body 
  const imgName = req.file.originalname 
  const imgPath = req.file.path 
  const publicId = req.file.filename 
  Sequence.create({ title, description, imgName, imgPath, publicId })
    .then(sequence => {
      console.log(sequence)
      res.redirect("/")
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;
