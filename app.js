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
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const flash = require('connect-flash');

const authRoutes = require('./routes/authentication');
const profile = require('./routes/profile');
const mainR = require('./routes/main');
const beer = require('./routes/beer');
const like = require('./routes/like');


const upload = multer({
  dest: './public/uploads/'
});

const User = require('./models/user');
const Beer = require('./models/Beer');
const Like = require('./models/Like');

require('dotenv').load();
const config = require('./config/config');
mongoose.connect(config.db);

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.locals.title = 'Artisan Beer Finder';

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

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect username"
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
  (req, username, password, next) => {
    process.nextTick(() => {
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (user) {
          return next(null, false);
        } else {
          const {
            username,
            name,
            password,
            role,
            web,
            location,
            phone,
            yearFounded
          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

          const newUser = new User({
            username,
            name,
            password: hashPass,
            pic_name: req.file.filename,
            role,
            web,
            location,
            phone,
            yearFounded
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

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use((req,res,next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', authRoutes);
app.use('/', mainR);
app.use('/beer', beer);
app.use('/', profile);
app.use('/like', like);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
