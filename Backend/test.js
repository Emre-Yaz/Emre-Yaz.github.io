const nodemailer = require("nodemailer");

const html = `
  <h1>Hi there</h1>
  <p>It's our first message sent with Nodemailer ;-)</p>
`;

async function main() {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.USER,
    to: "ibrahimemreyaz@gmail.com",
    subject: "Hello ✔",
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch((e) => console.log(e));
