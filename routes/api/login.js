const router = require("express").Router();
const passport = require("../../passport");

// Matches with "/api/login"

  router.post(
    '/',
    function (req, res, next) {
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            email: req.user.email,
            admin: req.user.admin
        };
        res.send(userInfo);
    }
)

  router.get('/', (req, res, next) => {
    console.log(req.user);
   console.log('======user!!======');
    if(req.user) {
      res.json({ user: req.user});
    }
    else {
      res.json({user: null});
    }
  }
)

module.exports = router;