var express = require('express');
var router = express.Router();
var User = require('../models/users')
var bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/', function(req,res,next){
  var user = new User();
  user.username = req.body.username;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) return next(err);
        user.password = hash
        user.save(function(err, user){
          if(err) {
            console.error(err);
            return res.status(500).json({result:0})
          }
          res.json({result:1})
      });
      });
  });
  
  
});

module.exports = router;
