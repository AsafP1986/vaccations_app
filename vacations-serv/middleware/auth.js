module.exports = function(req, res, next) {
  console.log("inside auth");
  console.log("req.session :", req.session);
  if (req.session.user) {
    console.log(" session verified");
    console.log("req.session :", req.session);
    next();
  } else {
    console.log(" no session");
    // next();
    res.redirect("/users/login");
  }
};
