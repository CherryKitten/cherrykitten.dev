const nodemailer = require("nodemailer");
module.exports = (app) => {
  app.route("/").get((req, res) => {
    res.render("home", { title: "Home" });
  });

  app.route("/social").get((req, res) => {
    res.render("social", { title: "Social" });
  });

  app.route("/contact").post((req, res) => {
    const smtpTrans = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: process.env.SMTP_SECURE || true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOpts = {
      from: "CherryKitten contact form", // This is ignored by Gmail
      to: process.env.CONTACT_MAIL || process.env.SMTP_USER,
      subject: "New message from contact form at Cherrykitten.dev",
      text: `${req.body.name} (${req.body.email}) :\n ${req.body.message}`,
    };

    smtpTrans.sendMail(mailOpts, (err) => {
      if (err) {
        res.render("social", { title: "Social", formFailed: true }); // Show a page indicating failure
      } else {
        res.render("social", { title: "Contact", formSent: true }); // Show a page indicating success
      }
    });
  });

  app.route("/projects").get((req, res) => {
    res.render("projects", { title: "Projects" });
  });

  app.route("/misc").get((req, res) => {
    res.render("misc", { title: "Misc" });
  });
};
