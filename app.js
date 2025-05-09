// VARİABLES
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var db = require('./db');
var cors = require('cors');
const modelUser = require('./models/userModel');


// ROUTES

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produkteRouter = require('./routes/produkte');
var vorteileRouter = require('./routes/vorteile');
var anfrageRouter = require('./routes/anfrage');
var impressumRouter = require('./routes/impressum');
var ratgeberRouter = require('./routes/ratgeber');


// SERVER & APP

var app = express();


// VİEW ENGİNE SETUP

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// MİDDLEWARE

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(flash()); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/produkte', produkteRouter);
app.get('/vorteile', vorteileRouter);
app.get('/anfrage', anfrageRouter);
app.get('/impressum', impressumRouter);
app.get('/ratgeber', ratgeberRouter);


// FORM >>  NEXT >>> POST

app.post('/', async (req, res) => {

  const userData = {

    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,
    question5: req.body.question5,
    name: req.body.name,
    nachname: req.body.nachname,
    email: req.body.email,
    tel: req.body.tel,

  };

  try {
    const newUser = await modelUser.insertMany(userData);
    console.log(newUser);
    
    // Flash mesajını ayarlıyoruz
    res.redirect('/');
    req.flash('success', 'Başarıyla gönderildi.'); 
  } catch (error) {
    console.error(error);
    req.flash('error', 'Bir hata oluştu, lütfen tekrar deneyin.');  // Hata mesajı
    res.redirect('/');  // Anasayfaya yönlendiriyoruz
  }
});

// Ana sayfa route
app.get('/', (req, res) => {
  // Flash mesajlarını almak
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');

  // Mesajları render ederken gönderebiliriz
  res.render('index', { successMessage, errorMessage });
});


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
