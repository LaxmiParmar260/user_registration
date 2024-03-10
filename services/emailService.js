var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parmarlaxmi260@gmail.com",
    pass: "cjhrtabqqhmftdzp",
  },
});

module.exports = {
  transporter,
};
