import api from './api';

/**
 * 页面交互模块
 */
const addEvent = api.addEvent;
let tags = {tag: ''};
let content = document.querySelectorAll('.right-box .content');

//标签列表部分
function tagMenu(callback) {
  let ul = document.querySelector('#tag-list');
  //标签栏
  let menu = document.querySelector('.fixmenu');
  //展开缩回icon箭头
  let icon = menu.querySelector('.icon');
  //是否显示标签页
  let isShow = true;
  addEvent(menu, 'click', function () {
    if (isShow) {
      //展开标签列表
      _css(ul, {top: '-180px', transition: '0.6s'});
      //箭头旋转
      _css(icon, {transform: 'rotate(180deg)', transition: '0.6s'});
    } else {
      //隐藏列表
      _css(ul, {top: '', transition: '0.6s'});
      _css(icon, {transform: '', transition: '0.6s'});
    }
    isShow = !isShow;
  });
  _clickTag(callback);
  //点击标签
  function _clickTag(callback) {
    let conTag = document.querySelector('#con-tag');
    let tag = conTag.querySelector('.tag');
    addEvent(ul, 'click', function (event) {
      let target = event.target || event.srcElement;
      if (target.nodeName === 'LI') {
        _swapHandle(content, conTag);
        tag.innerHTML = '<span>' + target.innerText + '</span>';
        tags.tag = tag.textContent;
        callback();
      }    
    });
  }
};


//移动端响应式菜单开关
function leftMenu() {
  //切换菜单按钮
  let nav = document.querySelector('.nav-toggle');
  //左侧菜单栏
  let lmenu = document.querySelector('.left-menu');
  //右侧内容部分
  let box = document.querySelector('.right-box');
  //菜单是否隐藏
  let isHiden = true;
  addEvent(nav, 'click', function () {
    if (isHiden) {
      //点击展开菜单
      _css(lmenu, {left: '0', transition: '0.6s'});
    } else {
      //点击隐藏菜单
      _css(lmenu, {left: '', transition: '0.6s'});
    }
    isHiden = !isHiden;
  });
  //点击非菜单部分，隐藏菜单
  addEvent(box, 'click', function () {
    _css(lmenu, {left: '', transition: '0.6s'});
  });
}


//切换功能，今天、未来7天、收信箱
function menuBtn() {
  let filter = document.querySelectorAll('#top-filters .filter');
  for(let i = 0, len = filter.length; i < len - 1; i++) {
    addEvent(filter[i], 'click', function () {
      _swapHandle(content, content[i]);
      for (let i = 0, len = filter.length; i < len - 1; i++) {
        _css(filter[i], {backgroundColor: '#fafafa'});
      }
      _css(filter[i], {backgroundColor: '#fff'});
    });
  }  
}

/**
 * 显示元素列表中的目标元素，隐藏列表中非目标元素
 * @param {元素列表} elements 
 * @param {目标元素} target 
 */
function _swapHandle(elements, target) {
  //遍历元素列表
  for (let i in elements) {
    //过滤掉原型上的属性
    if (!elements.hasOwnProperty(i)) {
      continue;
    }
    _css(elements[i], {display: 'none'});
  }
  _css(target, {display: 'block'});
}

/**
 * 改变元素的style属性
 * 调用方式:_css($el, {"font-size": ..., "background": ...}；
 * @param {dom对象} element
 * @param {样式对象} styles 
 */
function _css(element, styles) {
  for (let i in styles) {
    element.style[i] = styles[i];
  }
}

function _getNode(node) {
  if(node.nodeName === 'LI') {
    return node;
  } else {
    return _getNode(node.parentNode);
  }
}

export default {
  tagMenu,
  leftMenu,
  menuBtn,
  tags
}
