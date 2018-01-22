'use strict';
var path = require('path');
var util = require('./libs/util.js');
var wechat_file = path.join(__dirname, './config/wechat.txt');

// wechat
var config = {
  wechat: {
    token: 'bhu89ijnmko0',
    appID: 'wxd61026a80b610e7c',
    appSecret: '7b9dde29e00e60d9474551e06e409c3f587a45fca820916e183acca9e41839e',
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