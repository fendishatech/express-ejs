const Author = require("../models/author.model");
const Book = require("../models/book.model");
const AuthorBook = require("../models/author.book.model");
// DEV
const migrate_tables = async () => {
  try {
    // await Book.sync();
    await Author.sync();
    await Book.sync();
    await AuthorBook.sync();
    console.log("Table Migrated Successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = migrate_tables;
