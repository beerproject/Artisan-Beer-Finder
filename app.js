const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const debug = require('debug')(`repostars:${path.basename(__filename).split('.')[0]}`);
const bcrypt = require('bcrypt');
const multer = require('multer');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const upload = multer({
  dest: './public/uploads/'
});

const index = require('./routes/index');
const beer = require('./routes/beer');

const User = require('./models/User');
const Beer = require('./models/Beer');

mongoose.connect('mongodb://localhost/artisan-beer-finder');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layout');
app.use(expressLayouts);

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use(flash());

app.use(session({
  secret: 'ArtisanBeerFinder',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy((name, password, next) => {
  User.findOne({
    name
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect name"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: "Incorrect password"
      });
    }
    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, name, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
      User.findOne({
        'name': name
      }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (user) {
          return next(null, false);
        } else {
          // Destructure the body
          const {
            name,
            email,
            password,

          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            name,
            email,
            password: hashPass,
            pic_name: req.file.filename
          });

          newUser.save((err) => {
            if (err) {
              next(null, false, {
                message: newUser.errors
              });
            }
            return next(null, newUser);
          });
        }
      });
    });
  }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use('/', index);
app.use('/beer', beer);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
