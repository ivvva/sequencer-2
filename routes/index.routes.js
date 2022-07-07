const router = require("express").Router();

const User = require("../models/User.model");
const Sequence = require("../models/Sequence.model");

function loginCheck() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/auth/signup");
    }
  };
}

router.get("/participationHistory", (req, res) => {
  res.render("participationHistory");
});

router.post("/playground/done", (req, res) => {

  console.log(req.body.compositionId)

  let Id = req.body.compositionId 
  let drawingX = req.body.drawingX
  let drawingY = req.body.drawingY
  let notes = req.body.sequencerNotes

  Sequence.findByIdAndUpdate(Id, { notes, drawingX , drawingY })
		.then(() => {
			res.redirect(`/participationhistory`)
		})
		.catch(err => {
			next(err)
		})

});



router.get("/", (req, res, next) => {
  res.redirect("/auth/signup");
});

router.get("/playground/:sequenceId", (req, res, next) => {
  res.render("playground");
});

module.exports = router;
