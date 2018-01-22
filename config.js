'use strict';
var path = require('path');
var util = require('./libs/util.js');
var wechat_file = path.join(__dirname, './config/wechat.txt');

// wechat
var config = {
  wechat: {
    token: 'mywechatdemo',
    appID: 'wx58080b1fe9cb4f49',
    appSecret: '9dba811200ddd73da9a24d7f36762485',
    getAccessToken: function() {
      return util.readFileAsync(wechat_file);
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_file, data);
    }
  }
};

module.exports = config;