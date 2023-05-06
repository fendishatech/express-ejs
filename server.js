require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./src/routes/index");
const migrate_tables = require("./src/helpers/migrate_models");

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRouter);

// DEV
migrate_tables();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server ok!");
});
