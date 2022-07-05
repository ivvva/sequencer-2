const router = require("express").Router();

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
  res.redirect("/auth/signup")

});

router.get("/playground", (req, res, next) => {
  res.render("playground");
});

module.exports = router;