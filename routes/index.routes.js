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
// renderedparticipation

router.post("/renderedParticipation", (req, res) => {
  console.log(req.body)

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

router.get("/participationHistory", (req, res) => {
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

router.get("/renderedParticipation/:id", (req, res) => {

  let id = req.params['id']
  console.log(id)

  Sequence.findById(id)
    .then((Composition) => {
      console.log("composition:", Composition);
    })
    .catch((error) => {
      console.log("Error while getting the users from the DB: ", error);
      next(error);
    });
});

// router.post("/participation-history", async (req, res, next) => {
//   Sequence.find()
//     .then((allTheSequencesFromDB) => {
//       console.log("Retrieved sequences from DB:", allTheSequencesFromDB);
//       res.render("renderedParticipation/", { sequences: allTheSequencesFromDB }); 
//     })
//     .catch((error) => {
//       console.log("Error while getting the users from the DB: ", error);
//       next(error);
//     });
// });

module.exports = router;
