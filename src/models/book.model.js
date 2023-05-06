const db = require("../helpers/database");
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Book = db.define(
  "books",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_at: {
      type: DataTypes.DATE,
    },
    pages: {
      type: DataTypes.INTEGER,
    },
    cover_img: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        user.id = uuidv4();
      },
    },
  }
);

module.exports = Book;
