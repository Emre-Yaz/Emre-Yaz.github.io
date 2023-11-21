const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");

//const helmet = require("helmet");
//app.use(helmet());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "docs")));

app.use("/", indexRouter);

app.listen(process.env.PORT || port);
