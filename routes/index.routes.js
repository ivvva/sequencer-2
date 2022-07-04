const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/playground", (req, res, next) => {
  res.render("playground");
});

module.exports = router;
