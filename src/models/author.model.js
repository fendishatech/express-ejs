const db = require("../helpers/database");
const { Sequelize, DataTypes } = require("sequelize");
const Book = require("./book.model");
const { v4: uuidv4 } = require("uuid");

const Author = db.define(
  "authors",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

module.exports = Author;
