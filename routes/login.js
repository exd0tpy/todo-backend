var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var User = require('../models/users')


// dev-pengun.tk/login

router.post('/', function(req,response,next){
  
  var val_target = new User();
  val_target.username = req.body.username;
  val_target.password = req.body.password;


  console.log(req.session)
  User.find({username:val_target.username},(err,users)=>{
    if(err || users[0] == undefined) return response.status(500).send({error: '로그인 실패'})
    bcrypt.compare(val_target.password, users[0].password, function(err, res){
      if(err || res == false) return response.status(500).send({error: '로그인 실패'})
      
      req.session.logined= true;
      req.session._id = users[0]._id
      
      req.session.save()
      console.log(req.session)
      return response.json({result:1})
    })
  })
  
})

router.get('/', function(req,res,next){
  console.log(req.session)
  if(!req.session._id) return res.status(500).json({result:0})
  else return res.json({result:1})
})
module.exports = router