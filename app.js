const createError = require('http-errors');
const expressLib = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const app = expressLib();

const db = require('./helper/db')();

const config = require('./Config');

const middleware_token = require('./middleware/verify-token');

app.set('api_secret_key', config.api_screet_key);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(expressLib.json());
app.use(expressLib.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLib.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movies', middleware_token);
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({"message": 'Invalid Request',
    "detail": {
      "status": 404,
      "stack": 'Page not found'
    }
  });
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
