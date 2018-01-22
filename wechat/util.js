'use strict';

var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./template');

exports.parseXMLAsync = function (xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, { trim: true }, function (err, content) {
      if (err) reject(err);
      else resolve(content);
    });
  });
}

/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
exports.formatMessage = function (result) {
  return new Promise(function (resolve, reject) {
    var message = {};
    if (typeof result === 'object') {
      for (var key in result) {
        if (!(result[key] instanceof Array) || result[key].length === 0) {
          continue;
        }
        if (result[key].length === 1) {
          var val = result[key][0];
          if (typeof val === 'object') {
            message[key] = formatMessage(val);
          } else {
            message[key] = (val || '').trim();
          }
        } else {
          message[key] = result[key].map(function (item) {
            return formatMessage(item);
          });
        }
      }
    }
    resolve(message);
  });
}

exports.tpl = function (content, message) {
  var info = {};
  var type = 'text';
  var fromUserName = message.FromUserName;
  var toUserName = message.ToUserName;

  if (Array.isArray(content)) {
    type = 'news';
  }

  type = content.type || type;
  info.content = content;
  info.createTime = new Date().getTime();
  info.msgType = type;
  info.toUserName = fromUserName;
  info.fromUserName = toUserName;

  return tpl.compiled(info);
}