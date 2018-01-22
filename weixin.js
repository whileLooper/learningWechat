'use strict';

exports.reply = function* (next) {

  var message = this.weixin;

  // 消息逻辑处理
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        //扫描二维码事件
        console.log('扫描二维码进入...');
      }

      this.body = 'Thanks to subscribe. \r\n';
    } else if (message.Event === 'unsubscribe') {
      // 取消关注
      console.log('取消关注。。。');
      this.body = '';
    } else if (message.Event === 'LOCATION') {
      // 地理位置
      this.body = '您当前的地理位置： ' + message.Latitude + '/' + message.Longtidue + '-' + message.Precision;
    } else if (message.Event === 'CLICK') {
      // 点击菜单
      this.body = '您点击了菜单' + message.EventKey;
    } else if (message.Event === 'SCAN') {
      // 点击菜单
      this.body = '您扫描了二维码' + message.EventKey;
    } else if (message.Event === 'VIEW') {
      // 点击菜单
      this.body = '您点击了菜单中的链接' + message.EventKey;
    }
  } else if (message.MsgType === 'text') {
    var content = message.Content;
    var reply = '无法回复您的内容： ' + content;

    // 用户输入文本选项
    switch (content) {
      case '1':
        reply = '您当前选项为 1。'
        break;

      case '2':
        reply = '您当前选项为 2。'
        break;

      case '3':
        reply = '您当前选项为 3。'
        break;

      case '4':
        reply = [{
          title: 'Adidas Futurecraft',
          description: 'Adias new release futurecraft 3D',
          picUrl: 'https://www.adidas.com/com/apps/futurecraft4dss18/CDN_PATH/img/carousel/01.jpg',
          url: 'https://www.adidas.com/futurecraft'
        }]
        break;

      default:
        break;
    }
    this.body = reply;
  }

  yield next;
}