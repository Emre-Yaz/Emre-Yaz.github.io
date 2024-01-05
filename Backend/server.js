require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { body, validationResult } = require("express-validator");

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
app.use(bodyParser.json());

/////////////////////////////////t//////////

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04YRnPZ-QgYGECgYIARAAGAQSNwF-L9IrnhyaUNVfP8PC1a9fSl2bjJ9YytjgNtN61XqpqLkA-RqQNHCqU_cIkORG3PYgDBPz3cE",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "emreyaztest@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken:
      "1//04YRnPZ-QgYGECgYIARAAGAQSNwF-L9IrnhyaUNVfP8PC1a9fSl2bjJ9YytjgNtN61XqpqLkA-RqQNHCqU_cIkORG3PYgDBPz3cE",
    accessToken: oauth2Client.getAccessToken(), // Access token generated from refresh token
  },
});

app.post(
  "/submit-form",
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("message")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const name = req.body.name;
      const email = req.body.email;
      const message = req.body.message;

      const mailOptions = {
        from: "emreyaztest@gmail.com",
        to: "ibrahimemreyaz@gmail.com",
        subject: "New Message from Contact Form",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      res.status(200).send("Message received and email sent successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    }
  }
);

///////////////////////////////////////////

app.listen(process.env.PORT || port);
