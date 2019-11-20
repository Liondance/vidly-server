///
/// home.js
///

const express = require("express");

const router = express.Router();

// Root

router.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly",
    message: "This is where we get the movies!"
  });
});

module.exports = router;
