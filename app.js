var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');
var users = require('./routes/users');
var sha1 = require('sha1');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// wechat
var config = {
  wechat: {
    token: 'mywechatdemo',
    appID: 'wx58080b1fe9cb4f49',
    appSecret: '9dba811200ddd73da9a24d7f36762485'
  }
};

app.use(function *(next){
  console.log(this.query);
  var token = config.wechat.token;
  var signature = this.query.signature;
  var nonce = this.query.nonce;
  var timestamp = this.query.timestamp;
  var echostr = this.query.echostr;
  var str = [token, timestamp, nonce].sort().join('');
  var sha = sha1(str);
  console.log(sha);
  if (sha === signature) {
    this.body = echostr + '';
  } else {
    this.body = 'Invalid Signature';
  }
});


app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
