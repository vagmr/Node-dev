var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');


var indexRouter = require('./routes/web/index');
let authRouter = require('./routes/web/auth');
let apiRouter = require('./routes/api/account');
let apiAuthRouter = require('./routes/api/auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用session中间件
app.use(session({
  name: 'uid', //session的名字
  secret: 'vagmr', //密钥
  saveUninitialized: false,//在不需要session时，是否生成session
  resave: true, //每次请求都更新session
  store: MongoStore.create({ //创建session仓库
    mongoUrl: 'mongodb://127.0.0.1:27017/vagmr' //仓库地址
  }),
  cookie: {
    httpOnly: true,//禁止前端通过document.cookie获取操作
    maxAge: 60 * 1000 * 60 //保存一个小时
  }
}))

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/',authRouter);
app.use('/api',apiAuthRouter);
// catch 404 and forward to error handler
//创建404页面
app.use(function(req, res, next) {
  res.render('gy404');
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
