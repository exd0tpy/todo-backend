var express = require('express')
var router = express.Router()
var tests = require('../test.json')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: '27.96.130.157',
  user: 'whois',
  password: 'icebearcute',
  database: 'TODO'
})


router.get('/', (req,res,next) => {
  connection.connect()

  connection.query('desc todo',(err, rows, fields) =>{
    if(err) throw err
    console.log(rows[0])
  })
  connection.end()
  res.send(tests)
})

router.get('/:id', (req,res,next) => {
  var id = parseInt(req.params.id,10)
  var test = tests.filter( (test) => {
    return test.id === id
  })
  res.send(test)
})

module.exports = router