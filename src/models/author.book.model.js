const db = require("../helpers/database");
const { DataTypes } = require("sequelize");
const Book = require("./book.model");
const Author = require("./author.model");

const AuthorBook = db.define("AuthorBook", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
});

Author.belongsToMany(Book, { through: AuthorBook });
Book.belongsToMany(Author, { through: AuthorBook });
module.exports = AuthorBook;
