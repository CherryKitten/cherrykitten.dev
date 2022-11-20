const nodemailer = require("nodemailer");
module.exports = (app) => {
  app.route("/").get((req, res) => {
    res.render("home", { title: "Home" });
  });

  app
    .route("/contact")
    .get((req, res) => {
      res.render("contact", { title: "Contact" });
    })
    .post((req, res) => {
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
        from: "CherryKitten contact form <admin@cherrykitten.dev>", // This is ignored by Gmail
        to: process.env.CONTACT_MAIL || process.env.SMTP_USER,
        subject: "New message from contact form at Cherrykitten.dev",
        text: `${req.body.name} (${req.body.email}) :\n ${req.body.message}`,
      };

      smtpTrans.sendMail(mailOpts, (err) => {
        if (err) {
          console.log(err);
          res.render("contact", { title: "Social", formFailed: true }); // Show a page indicating failure
        } else {
          console.log("Email sent!");
          res.render("contact", { title: "Contact", formSent: true }); // Show a page indicating success
        }
      });
    });

  app.route("/projects").get((req, res) => {
    res.render("projects", { title: "Projects" });
  });

  app.route("/about").get((req, res) => {
    res.render("about", { title: "About me" });
  });

  app.route("/about/certifications").get((req, res) => {
    res.render("about_certifications", { title: "About me" });
  });

  app.route("/blog").get((req, res) => {
    res.render("blog", { title: "Blog" });
  });
  app.route("/impressum").get((req, res) => {
    res.render("impressum", { title: "Impressum" });
  });
};
