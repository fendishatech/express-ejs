const router = require("express").Router();
const Author = require("../models/author.model");

// All Routes
router.get("/", (req, res) => {
  return res.render("authors/index");
});

// Create author View
router.get("/new", (req, res) => {
  const author = {
    first_name: "kidus",
    last_name: "taye",
    phone_no: "0911121314",
  };
  return res.render("authors/new", { author });
});

// Create route api
router.post("/", async (req, res) => {
  const author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_no: req.body.phone_no,
  };
  try {
    const data = await Author.create(author);
    console.log(data.dataValues);
    return res.redirect(`/authors`);
    // return res.redirect(`authors/${req.body.first_name}`);
  } catch (error) {
    res.render("authors/new", {
      author,
      errorMessage: "Error Creating Author",
    });
  }
});

module.exports = router;
