const router = require("express").Router();
const passport = require("../../passport");
console.log("in loginrouter");

// Matches with "/api/login"

  router.post(
    '/',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
//        console.log(req.user)
//        console.log(req.data)
        console.log(req.body)
//        console.log(req.params)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            email: req.user.email,
            securityQuestion: req.user.securityQuestion,
            securityAnswer: req.user.securityAnswer
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