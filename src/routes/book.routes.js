const { Op } = require("sequelize");
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const multerConfig = require("../helpers/multerConfig");
const Book = require("../models/book.model");
const Author = require("../models/author.model");

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
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

// Create book api
router.post("/", multer(multerConfig).single("cover"), async (req, res) => {
  const book = {
    title: req.body.title,
    desc: req.body.desc,
    published_at: new Date(req.body.published_at),
    cover_img: req.file ? req.file.path : "",
    pages: req.body.pages,
  };
  try {
    const newBook = await Book.create(book);
    // res.redirect(`books/${newBook.id}`)
    return res.redirect(`books`);
  } catch {
    if (book.coverImageName != null) {
      removeBookCover(book.cover_img);
    }
    renderNewPage(res, book, true);
  }

  // const selectedAuthor = await Author.findOne({
  //   where: { id: book.author_id },
  // });
  const authors = await Author.findAll();
  try {
    const data = await Book.create(book);
    console.log(data.dataValues);
    return res.redirect(`/books`);
    // return res.redirect(`books/${req.body.first_name}`);
  } catch (error) {
    res.render("books/new", {
      book,
      errorMessage: "Error Creating Book",
      authors,
    });
  }
});

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.findAll();
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) params.errorMessage = "Error Creating Book";
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

module.exports = router;
