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
  res.render("auth/signup");
});

module.exports = router;
