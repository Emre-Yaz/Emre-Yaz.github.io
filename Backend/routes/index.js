const express = require("express");
const router = express.Router();
const path = require("path");

const helmet = require("helmet");
app.use(helmet());

router.get("/test", (req, res) => {
  res.render(path.join(__dirname, "..", "..", "views", "index.ejs"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "docs", "index.html"));
});

router.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "docs", "resume.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "docs", "contact.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "docs", "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "docs", "register.html"));
});

module.exports = router;
