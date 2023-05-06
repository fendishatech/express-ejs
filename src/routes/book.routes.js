const { Op } = require("sequelize");
const router = require("express").Router();
const Book = require("../models/book.model");

// All Books Routes
router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const query = req.query.query ? req.query.query : "";
  try {
    const { count, rows } = await Book.findAndCountAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${query}%` } }],
      },
    });
    console.log({ rows });
    return res.render("books/index", { books: rows, query: query });
  } catch (error) {
    console.log(error.message);
    return res.redirect("/");
  }
});

// Create book View
router.get("/new", (req, res) => {
  const book = {
    first_name: "kidus",
    last_name: "taye",
    phone_no: "0911121314",
  };
  return res.render("books/new", { book });
});

// Create route api
router.post("/", async (req, res) => {
  const book = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_no: req.body.phone_no,
  };
  try {
    const data = await Book.create(book);
    console.log(data.dataValues);
    return res.redirect(`/books`);
    // return res.redirect(`books/${req.body.first_name}`);
  } catch (error) {
    res.render("books/new", {
      book,
      errorMessage: "Error Creating Book",
    });
  }
});

module.exports = router;
