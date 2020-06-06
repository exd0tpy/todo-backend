var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session')
var history = require('connect-history-api-fallback');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var todoRouter = require('./routes/todo')
var loginRouter = require('./routes/login')
var app = express();

const port = 80
app.listen(port, ()=>console.log("LISTEN"))

var connect = require('./models');

connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy',1)

app.use(history());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'njfdnasjf184@#$2VDFvnj~!#$5',
  resave: false,
  cookie: {domain: 'dev-pengun.tk', path: '/', httpOnly: true, secure: false, maxAge: null },
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/register', usersRouter);
app.use('/api/test', testRouter);
app.use('/api/todo',todoRouter);
app.use('/login',loginRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
