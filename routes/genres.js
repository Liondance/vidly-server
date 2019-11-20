///
/// genres.js
///

const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

///
/// Simulated database
///

let genres = [
  { id: 101, name: "Action" },
  { id: 102, name: "Drama" },
  { id: 103, name: "Comedy" },
  { id: 104, name: "Romance" },
  { id: 105, name: "Horror" },
  { id: 106, name: "Thriller" }
];

const find = id => {
  const genre = genres.find(o => o.id === id);
  return genre;
};

const validate = genre => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(genre);
};

//
// routes
//

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const genre = {
    id: 300 + genres.length,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

/// Get genres

router.get("/", (_, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = find(parseInt(req.params.id));
  if (!genre) {
    res.status(404).send(`genre ${req.params.id} not found`);
  } else {
    res.send(genre);
  }
});

/// Update genres

router.put("/:id", (req, res) => {
  let genre = find(parseInt(req.params.id));
  if (!genre) {
    res.status(404).send(`genre ${req.params.id} not found`);
    return;
  }

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  genre.name = req.body.name;

  res.send(genre);
});

/// Delete genres

router.delete("/:id", (req, res) => {
  const genre = find(parseInt(req.params.id));
  if (!genre) {
    res.status(404).send(`genre ${req.params.id} not found`);
    return;
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
