const db = require("../helpers/database");
const { Sequelize, DataTypes } = require("sequelize");

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
  }
);

// This hook will generate a UUID for the primary key before creating a new record
Author.beforeCreate((user, options) => {
  user.id = uuidv4();
});

module.exports = Author;
