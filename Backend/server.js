//General
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");
//Email
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
//Security
const { body, validationResult } = require("express-validator");
const validator = require("validator");
require("dotenv").config();

//const helmet = require("helmet");
//app.use(helmet());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "docs")));
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use("/", indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

///////////////////////////////////////////

// POST route from contact form
app.post(
  "/submit-form",
  [
    // Implement server-side validation
    body("name").trim().isLength({ min: 1 }).escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("message").trim().isLength({ min: 1 }).escape(),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;

    // Creating a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        ciphers: "TLSv1.2",
        rejectUnauthorized: true,
      },
    });

    // Extracting form data
    const { name, email, message } = formData;

    // Email sending logic with form data
    const mailOptions = {
      from: process.env.USER,
      to: "ibrahimemreyaz@gmail.com",
      subject: "New Message From Contact Form",
      text: `Name: ${validator.escape(name)}\nEmail: ${validator.escape(
        email
      )}\nMessage: ${validator.escape(message)}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending message. Please try again later.");
    }
  }
);
///////////////////////////////////////////

app.listen(process.env.PORT || port);
