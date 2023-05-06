const { Op } = require("sequelize");
const router = require("express").Router();
const Author = require("../models/author.model");

// All Routes
router.get("/", async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;

  try {
    const { count, rows } = await Client.findAndCountAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${query}%` } },
          { father_name: { [Op.like]: `%${query}%` } },
          { phone_no: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    // const authors = await Author.findAll();
    console.log({ rows });
    return res.render("authors/index", { authors: rows });
  } catch (error) {
    return res.redirect("/");
  }
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
