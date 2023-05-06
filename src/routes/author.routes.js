const router = require("express").Router();
const Author = require("../models/author.model");

// All Routes
router.get("/", (req, res) => {
  return res.render("authors/index");
});

// Create author View
router.get("/new", (req, res) => {
  return res.render("authors/new");
});

// Create route api
router.post("/new", (req, res) => {
  return res.send("About to create Author");
});

module.exports = router;
