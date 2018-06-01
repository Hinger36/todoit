//事件监听 兼容性封装
function addEvent(ele, type, handle) {
  if (ele.addEventListener) {
    ele.addEventListener(type, handle, false);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, function () {
      handle.call(this);
    });
  } else {
    ele['on' + type] = handle;
  }
}
//生成一个唯一数
function ID() {
  return Number(
    Math.random().toString().split('.')[1]
  ).toString(36) + Date.now().toString(36);
}

export default {
  addEvent,
  ID,
}