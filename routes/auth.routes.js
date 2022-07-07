const router = require("express").Router();
var axios = require("axios");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

const User = require("../models/User.model");
const Sequence = require("../models/Sequence.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const async = require("hbs/lib/async");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// console.log(drawingCoordinatesX)

router.post("/signup", async (req, res) => {
  const { username, password, email, location } = req.body;

  if (!username) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your username.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Username already taken." });
    }
    const sequence = await Sequence.create({
      notes: [],
      drawingX: [],
      drawingY: [],
    });
    await bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        return User.create({
          username,
          password: hashedPassword,
          email,
          location,
          sequencers: [sequence],
        });
      });
    });
    req.session.sequence = sequence;
    req.session.user = user;
    const sequenceId = sequence._id.toString();
    res.redirect(`/playground/${sequenceId}`);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).render("auth/signup", {
        errorMessage:
          "Username need to be unique. The username you chose is already in use.",
      });
    }
    return res
      .status(500)
      .render("auth/signup", { errorMessage: error.message });
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your username.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).render("auth/login", {
        errorMessage: "Wrong credentials.",
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      return res.status(400).render("auth/login", {
        errorMessage: "Wrong credentials.",
      });
    }

    // if (user.sequencers.length == 0) {
    const sequence = await Sequence.create({
      notes: [],
      drawingX: [],
      drawingY: [],
    });
    req.session.sequence = sequence;
    req.session.user = user;
    const sequenceId = sequence._id.toString();
    res.redirect(`/playground/${sequenceId}`);
    // }
    // const lastSequence = await User.find( {sequencers}, { sequencers: { $slice: 1 } });
    // console.log(lastSequence);
    // const lastSequenceId = lastSequence._id.toString();
    // req.session.sequence = lastSequence;
    // req.session.user = user;
    // return res.redirect(`/playground/:${lastSequenceId}`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
