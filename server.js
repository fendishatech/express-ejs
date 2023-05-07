require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const indexRouter = require("./src/routes/index");
const authorRouter = require("./src/routes/author.routes");
const bookRouter = require("./src/routes/book.routes");
const migrate_tables = require("./src/helpers/migrate_models");

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// DEV
// migrate_tables();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server ok!");
});
