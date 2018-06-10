/**
 * 图片预加载函数
 * @param {图片数组或对象} images 
 * @param {全部图片加载成功的回调函数} callback 
 * @param {加载超时的时间} timeout 
 */
function preload(images, callback, timeout) {
  //加载完成的图片计数器
  let count = 0;
  //全部图片加载完成
  let success = true;
  //是否加载超时
  let isTimeout = false;
  //超时定时器ID
  let timeId = 0;

  for (let key in images) {
    //过滤掉继承的属性
    if (!images.hasOwnProperty(key)) {
      continue;
    }
    let item = images[key];
    if (typeof(item) === 'string') {
      item = {src: item}
    } else {
      continue;
    }
    count++;
    //设置图片元素的img，是一个Image对象
    item.image = new Image();
    doload(item);
    
  }
  if (timeout) {
    timeId = setTimeout(onTimeout, timeout);
  }
  function doload(item) {
    item.status = 'loading';

    item.image.onload = function () {
      item.status = 'loaded';
      success = success && true;
      cleanEvent();
    };
    item.image.onerror = function () {
      item.status = 'error';
      success = false;
      cleanEvent()
    };
    item.image.src = item.src;
    //清除绑定的事件
    function cleanEvent() {
      item.image.onload = item.image.onerror = null;
  
      if (!--count && !isTimeout) {
        clearTimeout(timeId);
        callback(true);
      }    
    }
  }
  //超时函数  
  function onTimeout() {
    isTimeout = true;
    callback(false);
  }
}
export default preload;