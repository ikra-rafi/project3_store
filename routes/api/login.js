const router = require("express").Router();
const passport = require("../../passport");
console.log("in loginrouter");

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
        };
        res.send(userInfo);
    }
)

// router.post(
//   '/acct',
//   function(req, res, next) {
//     console.log(req.body)
//     next()
//   },
//   (req, res) => {
//     console.log('log acct info', req.user);
//     var userInfo = {
//       email: req.user.email,
//       securityQuestion: req.user.securityQuestion,
//       securityAnswer: req.user.securityAnswer,
//       firstName: firstName,
//       lastName: lastName,
//     }
//     res.send(userInfo);
//   }

// )

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