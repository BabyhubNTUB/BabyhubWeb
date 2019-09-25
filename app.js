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
var userSuccess = require('./routes/userSuccess');
var userFail = require('./routes/userFail');


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
var updatediary = require('./routes/updatediary');
var updateforum = require('./routes/updateforum');
var updategrowrecord = require('./routes/updategrowrecord');
var myforum = require('./routes/myforum');

var mlogout= require('./routes/mlogout');
var homepageMan= require('./routes/homepageMan');
var msignInSuccess = require('./routes/msignInSuccess');
var managerSuccess = require('./routes/managerSuccess');
var managerFail = require('./routes/managerFail');
var childEducation3 = require('./routes/childEducation3');
var pregnancyKnowledge3 = require('./routes/pregnancyKnowledge3');
var forum3 = require('./routes/forum3');
var achildEducation3 = require('./routes/achildEducation3');
var apregnancyKnowledge3 = require('./routes/apregnancyKnowledge3');
var aforum3 = require('./routes/aforum3');
var addEducation = require('./routes/addEducation');
var addKnowledge = require('./routes/addKnowledge');
var updateEducation = require('./routes/updateEducation');
var updateKnowledge = require('./routes/updateKnowledge');
var edu_add = require('./routes/edu_add');
var edu_del = require('./routes/edu_del');
var edu_update = require('./routes/edu_update');
var pre_add = require('./routes/pre_add');
var pre_del = require('./routes/pre_del');
var pre_update = require('./routes/pre_update');
var for_del = require('./routes/for_del');
var comment_del = require('./routes/comment_del');

var search = require('./routes/search');
var searchchild = require('./routes/searchchild');
var searchpre = require('./routes/searchpre');
var forumtype = require('./routes/forumtype');
// ----------------------------------------------

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: '3456789765432', cookie: { maxAge: 6000000 },resave:true,saveUninitialized: true}));

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
app.use('/userSuccess', userSuccess);
app.use('/userFail', userFail);

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
app.use('/updatediary', updatediary );
app.use('/updateforum', updateforum );
app.use('/updategrowrecord', updategrowrecord );
app.use('/myforum', myforum );

app.use('/mlogout', mlogout);
app.use('/homepageMan', homepageMan);
app.use('/msignInSuccess', msignInSuccess);
app.use('/managerSuccess', managerSuccess);
app.use('/managerFail', managerFail);
app.use('/childEducation3', childEducation3);
app.use('/pregnancyKnowledge3', pregnancyKnowledge3);
app.use('/forum3', forum3);
app.use('/achildEducation3', achildEducation3);
app.use('/apregnancyKnowledge3', apregnancyKnowledge3);
app.use('/aforum3', aforum3);
app.use('/addEducation', addEducation);
app.use('/addKnowledge', addKnowledge);
app.use('/updateEducation', updateEducation);
app.use('/updateKnowledge', updateKnowledge);
app.use('/edu_add', edu_add);
app.use('/edu_del', edu_del);
app.use('/edu_update', edu_update);
app.use('/pre_add', pre_add);
app.use('/pre_del', pre_del);
app.use('/pre_update', pre_update);
app.use('/for_del', for_del);
app.use('/comment_del', comment_del);

app.use('/search', search);
app.use('/searchchild', searchchild);
app.use('/searchpre', searchpre);
app.use('/forumtype', forumtype);
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

process.on('unhandledRejection', error =>{
  console.error('unhandledRejection', error);
  process.exit(1)
});
module.exports = app;
