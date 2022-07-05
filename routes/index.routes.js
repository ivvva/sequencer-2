const router = require("express").Router();
const Sequence = require("../models/Sequence") 
const {uploader, cloudinary} = require("../config/cloudinary"); 
const User = require('../models/User.model.js');

function loginCheck() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/auth/signup");
    }
  };
}

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
  // amend these const values
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

// GET route to retrieve and display all users
router.get('/participation-history', (req, res, next) => {
    User.find() // order users by most recent to oldest after login. change here later?
        .then(allTheUsersFromDB => {
            console.log('Retrieved users from DB:', allTheUsersFromDB);
            res.render('participationHistory');
        })
        .catch(error => {
        console.log('Error while getting the users from the DB: ', error);

        // Call the error-middleware to display the error page to the user
        next(error);
        });
    }
); 

module.exports = router;
  res.render("auth/signup");
});

router.get("/playground", (req, res, next) => {
  res.render("playground");
});

module.exports = router;