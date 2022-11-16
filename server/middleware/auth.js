module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.json({message: 'The request was not authenticated'});
      }
    },
    // ensureGuest: function (req, res, next) {
    //   if (!req.isAuthenticated()) {
    //     return next();
    //   } else {
    //     res.redirect("/dashboard");
    //   }
    // },
  };