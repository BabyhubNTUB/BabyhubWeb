var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ----------------------------------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var register = require('./routes/register');
var member_add = require('./routes/member_add');
var registerSuccess = require('./routes/registerSuccess');
var registerFail = require('./routes/registerFail');
var signIn = require('./routes/signIn');
var userSignIn = require('./routes/userSignIn');
var managerSignIn = require('./routes/managerSignIn');
var signInSuccess = require('./routes/signInSuccess');
var signInFail = require('./routes/signInFail');
var logout = require('./routes/logout');
var manager = require('./routes/manager');
var homepage = require('./routes/homepage');


var childEducation2 = require('./routes/childEducation2');
var pregnancyKnowledge2 = require('./routes/pregnancyKnowledge2');
var forum2 = require('./routes/forum2');
var achildEducation2 = require('./routes/achildEducation2');
var apregnancyKnowledge2 = require('./routes/apregnancyKnowledge2');
var aforum2 = require('./routes/aforum2');


var profile = require('./routes/profile');
var baby = require('./routes/baby');
var childEducation = require('./routes/childEducation');
var pregnancyKnowledge = require('./routes/pregnancyKnowledge');
var forum = require('./routes/forum');
var vaccine = require('./routes/vaccine');
var achievement = require('./routes/achievement');
var growrecord = require('./routes/growrecord');
var diary = require('./routes/diary');
var addbaby = require('./routes/addbaby');
var babysetting = require('./routes/babysetting');
var recordcart = require('./routes/recordcart');
var profilesetting = require('./routes/profilesetting');
var addforum = require('./routes/addforum');
var achildEducation = require('./routes/achildEducation');
var aforum = require('./routes/aforum');
var apregnancyKnowledge = require('./routes/apregnancyKnowledge');
var linebot = require('./routes/linebot');
var updatediary = require('./routes/updatediary');
var updateforum = require('./routes/updateforum');
var updategrowrecord = require('./routes/updategrowrecord');
// ----------------------------------------------

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: '123456789', cookie: { maxAge: 60000 }}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', register);
app.use('/member_add', member_add);
app.use('/registerSuccess', registerSuccess);
app.use('/registerFail', registerFail);
app.use('/signIn', signIn);
app.use('/userSignIn', userSignIn);
app.use('/managerSignIn', managerSignIn);
app.use('/signInSuccess', signInSuccess);
app.use('/signInFail', signInFail);
app.use('/logout', logout);
app.use('/manager', manager);
app.use('/homepage', homepage);

app.use('/childEducation2', childEducation2);
app.use('/pregnancyKnowledge2', pregnancyKnowledge2);
app.use('/forum2', forum2);
app.use('/achildEducation2', achildEducation2);
app.use('/apregnancyKnowledge2', apregnancyKnowledge2);
app.use('/aforum2', aforum2);

app.use('/profile', profile);
app.use('/baby', baby );
app.use('/childEducation', childEducation );
app.use('/pregnancyKnowledge', pregnancyKnowledge );
app.use('/forum', forum );
app.use('/vaccine', vaccine );
app.use('/achievement', achievement );
app.use('/growrecord', growrecord );
app.use('/diary', diary );
app.use('/addbaby', addbaby );
app.use('/babysetting', babysetting );
app.use('/recordcart', recordcart );
app.use('/profilesetting', profilesetting );
app.use('/addforum', addforum );
app.use('/achildEducation', achildEducation );
app.use('/aforum', aforum );
app.use('/apregnancyKnowledge', apregnancyKnowledge );
app.use('/linebot', linebot );
app.use('/updatediary', updatediary );
app.use('/updateforum', updateforum );
app.use('/updategrowrecord', updategrowrecord );
// ----------------------------------------------

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
