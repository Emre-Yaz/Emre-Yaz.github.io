require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

//const helmet = require("helmet");
//app.use(helmet());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "docs")));

app.use("/", indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "emreyaztest@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/submit-form", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Email content
  const mailOptions = {
    from: "emreyaztest@gmail.com",
    to: "ibrahimemreyaz@gmail.com",
    subject: "New Message from Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Message received and email sent successfully!");
    }
  });
});

app.listen(process.env.PORT || port);
