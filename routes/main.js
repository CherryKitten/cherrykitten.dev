const nodemailer = require("nodemailer");
const {verify} = require('hcaptcha');

module.exports = (app, hcaptchasecretkey) => {
  app.route("/").get((req, res) => {
    res.render("home", { title: "Home" });
  });

  app
    .route("/contact")
    .get((req, res) => {
      res.render("contact", { title: "Contact" });
    })
    .post((req, res, next) => {
      let token = req.body['h-captcha-response'] //get hCaptcha token from form
      if (!token) {
        console.log('no hCaptcha token');
        return res.render("contact", { title: "Contact", formFailed: true, message: "Captcha required."}); // Show error if no hCaptcha token provided
      }
          verify(hcaptchasecretkey, token) //Verify the token
              .then((data) => {
                if (data.success === true) {
                  console.log('success!', data);
                } else {
                  console.log('verification failed');
                }
              })
              .catch(console.error);
      next()
        },
        (req, res) =>
    {
      //All the data for sending a mail
      const smtpTrans = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 465,
        secure: process.env.SMTP_SECURE || true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      //Build email
      const mailOpts = {
        from: "CherryKitten contact form <" + process.env.SMTP_USER + ">",
        to: process.env.CONTACT_MAIL || process.env.SMTP_USER,
        subject: "New message from contact form at Cherrykitten.dev",
        text: `${req.body.name} (${req.body.email}) :\n ${req.body.message}`,
      };
      //Send mail
      smtpTrans.sendMail(mailOpts, (err) => {
        if (err) {
          console.log(err);
          res.render("contact", { title: "Contact", formFailed: true, message: "Could not Submit. Please try again later. The error has been logged and will be investigated." }); // Show error
        } else {
          console.log("Email sent!");
          res.render("contact", { title: "Contact", formSent: true }); // Show success page
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

  app.route("/impressum").get((req, res) => {
    res.render("impressum", { title: "Impressum" });
  });
};
