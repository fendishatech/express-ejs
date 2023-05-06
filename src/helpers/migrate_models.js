// const Book = require("");
const Author = require("../models/author.model");
// DEV
const migrate_tables = async () => {
  try {
    // await Book.sync();
    await Author.sync();
    console.log("Table Migrated Successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = migrate_tables;
