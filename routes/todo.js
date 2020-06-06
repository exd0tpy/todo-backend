var express = require('express')
var router = express.Router()
var tests = require('../test.json')
var Todo = require('../models/todo')


router.post('/', (req,res,next) => {
  var todo = new Todo();
  if(req.body.title == "" || req.body.due_date == "" ){
    return res.status(404).json({result:"제목과 날짜를 입력해주세요."})
  }
  if(!req.session._id){
    return res.status(404).json({result: "로그인을 먼저 해주세요."})
  }
  todo.owner = req.session._id
  console.log(req.session._id)
  todo.title = req.body.title;
  todo.memo = req.body.memo;
  todo.due_date = new Date(req.body.due_date);
  todo.isDone = false

  console.log(req.session)
  todo.save(function(err, todo){
      if(err) {
        console.error(err);
        res.json({result:0})
        return
      }
      res.json({result:1})
  });
  
})
router.delete('/', (req,res,next)=>{
  console.log(req.body._id)
  Todo.remove({_id:req.body._id}, function(err, output){
    if(err) return res.status(500).json({ error: "database failure" });

    res.status(204).end();
})
})

router.get('/', (req,res,next)=>{
  owner = req.session._id
  console.log(req.session)
  if(!req.session._id) return res.status(404).json({result:"로그인을 먼저 해주세요."})
  Todo.find({owner: owner, isDone: false},(err,todos)=>{
    if(err) return res.status(404).json({result:'에러'})
    return res.json(todos)
  }).sort('due_date')
})

router.get('/:id', (req,res,next) => {
  var id = parseInt(req.params.id,10)
  var test = tests.filter( (test) => {
    return test.id === id
  })
  res.send(test)
})

module.exports = router