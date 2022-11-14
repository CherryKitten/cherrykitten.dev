module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("home", {
      title: "Home",
    });
  });

  app.get("/social", (req, res) => {
    res.render("social", {
      title: "Social",
    });
  });

  app.get("/projects", (req, res) => {
    res.render("projects", {
      title: "Projects",
    });
  });

  app.get("/misc", (req, res) => {
    res.render("misc", {
      title: "Misc",
    });
  });
};
