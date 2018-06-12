/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  return Number(Math.random().toString().split('.')[1]).toString(36) + Date.now().toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addEvent,
  ID
});

/***/ }),

/***/ "./src/indexDB.js":
/*!************************!*\
  !*** ./src/indexDB.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


//数据库名称
const DB_NAME = 'todoit-indexedDB';
//数据库版本号
const DB_VERSION = 2;
//对象仓库名称
const DB_STORE_NAME = 'todolist';
const KEYPATH = 'tick';
//索引
const INDEX = {
  IndexName: 'id',
  keyPath: 'id',
  unique: false
};
let db;

//从删库到跑路
function deleteIndexDB() {
  var DBDeleteRequest = window.indexedDB.deleteDatabase(DB_NAME);

  DBDeleteRequest.onerror = function (event) {
    console.log("Error deleting database.");
  };

  DBDeleteRequest.onsuccess = function (event) {
    console.log("Database deleted successfully");

    console.log(event.result); // should be undefined
  };
}

//数据库初始化
function initDB(data, callback) {
  const openReq = window.indexedDB.open(DB_NAME, DB_VERSION);

  openReq.onerror = event => {
    console.log("initDb:", event.target.errorCode);
  };
  openReq.onsuccess = event => {
    db = event.target.result;
    getAllDB(data, callback);
    console.log("initDb DONE");
  };
  openReq.onupgradeneeded = event => {
    db = event.target.result;
    if (event.oldVersion) {
      db.deleteObjectStore(DB_STORE_NAME);
    }
    _createObjectStoreHandle();

    console.log('创建对象仓库成功');
  };
  openReq.onblocked = () => {
    console.log('上一次的数据库连接还未关闭');
  };
}
//创建对象仓库
function _createObjectStoreHandle() {
  const store = db.createObjectStore(DB_STORE_NAME, { keyPath: KEYPATH, autoIncrement: false });
  _createIndex(store, INDEX);
}
//创建索引
function _createIndex(store, index) {
  store.createIndex(index.IndexName, index.keyPath, { unique: index.unique });
}
//建立事务
function _createTransation() {
  const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
  transaction.oncomplete = () => {
    // console.log('事务完成');
  };
  transaction.onerror = () => {
    console.log('事务出错');
  };
  transaction.onabort = () => {
    console.log('事务中断');
  };
  return transaction;
}
/**
 * 添加数据
 * @param {需要存储的数据对象或者数组} obj 
 */
function addDB(obj, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  for (let i in obj) {
    store.put(obj[i]).onsuccess = () => {
      callback();
      // console.log('添加成功');
    };
  }
}
//删除一条数据
function deleteDB(keyPath, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.delete(keyPath).onsuccess = () => {
    // console.log('删除成功');
    callback();
  };
}

//获取一条数据
function getDB(keyPath, arr) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.get(keyPath).onsuccess = event => {
    let cursor = event.target.result;
    if (cursor) {
      obj.push(cursor);
    }
  };
}

//获取全部数据
function getAllDB(arr, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.getAll().onsuccess = event => {
    let cursor = event.target.result;
    if (cursor) {
      cursor.forEach(x => arr.push(x));
      callback();
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initDB,
  addDB,
  deleteDB,
  getDB,
  getAllDB,
  deleteIndexDB
});

/***/ }),

/***/ "./src/interactive.js":
/*!****************************!*\
  !*** ./src/interactive.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.js");


/**
 * 页面交互模块
 */
const addEvent = _api__WEBPACK_IMPORTED_MODULE_0__["default"].addEvent;
let tags = { tag: '' };
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
      _css(ul, { top: '-180px', transition: '0.6s' });
      //箭头旋转
      _css(icon, { transform: 'rotate(180deg)', transition: '0.6s' });
    } else {
      //隐藏列表
      _css(ul, { top: '', transition: '0.6s' });
      _css(icon, { transform: '', transition: '0.6s' });
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
      _css(lmenu, { left: '0', transition: '0.6s' });
    } else {
      //点击隐藏菜单
      _css(lmenu, { left: '', transition: '0.6s' });
    }
    isHiden = !isHiden;
  });
  //点击非菜单部分，隐藏菜单
  addEvent(box, 'click', function () {
    _css(lmenu, { left: '', transition: '0.6s' });
  });
}

//切换功能，今天、未来7天、收信箱
function menuBtn() {
  let filter = document.querySelectorAll('#top-filters .filter');
  for (let i = 0, len = filter.length; i < len - 1; i++) {
    addEvent(filter[i], 'click', function () {
      _swapHandle(content, content[i]);
      for (let i = 0, len = filter.length; i < len - 1; i++) {
        _css(filter[i], { backgroundColor: '#fafafa' });
      }
      _css(filter[i], { backgroundColor: '#fff' });
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
    _css(elements[i], { display: 'none' });
  }
  _css(target, { display: 'block' });
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

// function _getNode(node) {
//   if(node.nodeName === 'LI') {
//     return node;
//   } else {
//     return _getNode(node.parentNode);
//   }
// }

/* harmony default export */ __webpack_exports__["default"] = ({
  tagMenu,
  leftMenu,
  menuBtn,
  tags
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _indexDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexDB */ "./src/indexDB.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/api.js");
/* harmony import */ var _interactive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactive */ "./src/interactive.js");
/* harmony import */ var _preload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preload */ "./src/preload.js");





//事件封装函数
const addEvent = _api__WEBPACK_IMPORTED_MODULE_1__["default"].addEvent;
//随机数ID
const ID = _api__WEBPACK_IMPORTED_MODULE_1__["default"].ID;
let todolist = [];
let tags = _interactive__WEBPACK_IMPORTED_MODULE_2__["default"].tags;
let images = ['./images/736b25b3212facd336d9bc0fd047c07e.png', './images/delete.png', './images/success.png', './images/webwxgetmsgimg.png'];

(function init() {
  //初始化数据库
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].initDB(todolist, showList);

  time();
  addTodo();
  listHandle();
  //预加载图片
  Object(_preload__WEBPACK_IMPORTED_MODULE_3__["default"])(images, function (e) {
    console.log(e);
  });

  //交互部分
  _interactive__WEBPACK_IMPORTED_MODULE_2__["default"].tagMenu(showList);
  _interactive__WEBPACK_IMPORTED_MODULE_2__["default"].leftMenu();
  _interactive__WEBPACK_IMPORTED_MODULE_2__["default"].menuBtn();
})();

//列表的时间
function time() {
  let today = document.querySelector('.time');
  let weekDay = document.querySelectorAll('.week .tag');
  //今天列表的时间
  today.innerHTML = getNowTime().week + getNowTime().month;
  //未来7天列表的时间
  for (let i = 0, len = weekDay.length; i < len; i++) {
    //render week time
    weekDay[i].innerHTML = `
      <span>${getNowTime(i).week}</span>
      <span class="time">${getNowTime(i).month}</span>`;
  }
}

//添加待办事项
function addTodo(item) {
  let content = document.getElementsByClassName('content');
  //收件箱
  addEvent(content[0], 'click', event => {
    let target = event.target || event.srcElement;
    if (target.nodeName === 'BUTTON') {
      let input = target.parentNode.children[0];
      if (!input.value) {
        return;
      }
      _addItem(input.value);
      input.value = '';
    } else {
      return;
    }
  });
  //今天
  addEvent(content[1], 'click', event => {
    let target = event.target || event.srcElement;
    if (target.nodeName === 'BUTTON') {
      let input = target.parentNode.children[0];
      if (!input.value) {
        return;
      }
      _addItem(input.value);
      input.value = '';
    } else {
      return;
    }
  });
  //未来7天
  addEvent(content[2], 'click', event => {
    let target = event.target || event.srcElement;
    if (target.nodeName === 'BUTTON') {
      let input = target.parentNode.children[0];
      let index = Array.prototype.indexOf.call(target.parentNode.parentNode.parentNode.children, target.parentNode.parentNode);
      if (!input.value) {
        return;
      }
      _addItem(input.value, index);
      input.value = '';
    } else {
      return;
    }
  });
  addEvent(content[3], 'click', event => {
    let target = event.target || event.srcElement;
    if (target.nodeName === 'BUTTON') {
      let input = target.parentNode.children[0];
      if (!input.value) {
        return;
      }
      _addItem(input.value, null, tags.tag);
      input.value = '';
    } else {
      return;
    }
  });
}

//添加一条任务
function _addItem(task, day, tag) {
  let todoitem = {
    id: ID(),
    tick: Date.now(),
    task: task,
    time: getNowTime(day).month,
    //标记是否完成
    status: false,
    tag: tag
  };
  todolist.unshift(todoitem);
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].addDB(todolist, showList);
}

//显示数据
function showList() {
  let inbox = document.getElementById('inbox');
  let today = document.getElementById('today');
  let weeks = document.querySelectorAll('.week .todolist');
  let proTag = document.getElementById('pro-tag');
  _sort();
  let todayList = todolist.filter(ele => ele.time === getNowTime().month);
  clearList();
  //如果收信箱TODO列表为空
  if (!todolist.length) {
    //创建首页图片
    _indexImg(inbox);
  }
  //如果今天TODO列表为空
  if (!todayList.length) {
    _indexImg(today);
  }
  //创建列表
  _createList(inbox, todolist);
  _createList(today, todayList);

  for (let i = 0, len = weeks.length; i < len; i++) {
    let weekList = todolist.filter(ele => ele.time === getNowTime(i).month);
    //创建未来7天的TODO列表
    _createList(weeks[i], weekList);
  }
  //创建标签列表
  _createList(proTag, _tagList());
}
//创建数据列表
function _createList(list, obj) {
  obj.forEach(ele => {
    let li = document.createElement('li');
    let p = document.createElement('p');
    let em = document.createElement('em');
    p.innerHTML = '<span></span><i>' + ele.time + '</i>' + ele.task;
    let item = list.appendChild(li);
    item.appendChild(p);
    item.appendChild(em);
    //完成任务
    if (ele.status) {
      //完成的任务添加删除线
      p.style.textDecoration = 'line-through';
      p.children[0].style.background = 'url(./images/success.png) no-repeat';
    }
  });
}
//清空数据列表
function clearList() {
  let list = document.getElementsByClassName('todolist');
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].innerHTML = '';
  }
}

/**
 * 创建首页图片
 * @param {todolist列表dom元素} list 
 */
function _indexImg(list) {
  let div = document.createElement('div');
  let li = document.createElement('li');
  let box = list.appendChild(li);
  li.style.border = 'none';
  box.appendChild(div).innerHTML = '<div></div><div>你的任务完成了！#TodolistZero</div>';
}

function listHandle() {
  let ul = document.getElementsByClassName('todolist');
  let inbox = document.getElementById('inbox');
  let today = document.getElementById('today');
  let weeks = document.getElementsByClassName('week');
  let proTag = document.getElementById('pro-tag');
  addEvent(inbox, 'click', event => {
    let target = event.target || event.srcElement;
    //删除点击的那条任务
    if (target.nodeName === 'EM') {
      _deleteItem(todolist, target);
    }
    //点击某条任务，代表完成
    if (target.nodeName === 'P') {
      _getTask(todolist, target);
    }
  });
  addEvent(today, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    //删除任务
    if (target.nodeName === 'EM') {
      _deleteItem(todayList, target);
    }
    //完成任务
    if (target.nodeName === 'P') {
      _getTask(todayList, target);
    }
  });

  for (let i = 0, len = weeks.length; i < len; i++) {
    addEvent(ul[i + 2], 'click', event => {
      let target = event.target || event.srcElement;
      //未来7天中某一天的todo列表
      let weekList = todolist.filter(ele => ele.time === getNowTime(i).month);
      if (target.nodeName === 'EM') {
        _deleteItem(weekList, target);
      }
      if (target.nodeName === 'P') {
        _getTask(weekList, target);
      }
    });
  }
  addEvent(proTag, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    if (target.nodeName === 'EM') {
      _deleteItem(_tagList(), target);
    }
    if (target.nodeName === 'P') {
      _getTask(_tagList(), target);
    }
  });
}
//完成一条任务
function _getTask(somelist, target) {
  let index = Array.prototype.indexOf.call(target.parentNode.parentNode.children, target.parentNode);
  let state = true;
  todolist.forEach(ele => {
    if (ele.id === somelist[index].id) {
      if (ele.status) {
        state = false;
      } else {
        ele.status = true;
        state = true;
      }
    }
  });
  if (state) {
    _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].addDB(todolist, showList);
  }
}
//删除一条数据
function _deleteItem(somelist, target) {
  let index = Array.prototype.indexOf.call(target.parentNode.parentNode.children, target.parentNode);
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].deleteDB(somelist[index].tick, _refresh);
}
//刷新数据
function _refresh() {
  todolist = [];
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].getAllDB(todolist, showList);
}
function _sort() {
  todolist.sort((a, b) => a.status - b.status);
}

function getNowTime(addDay) {
  addDay = addDay || 0;
  let foo = new Date();
  foo.setDate(foo.getDate() + addDay);
  let month = foo.getMonth() + 1 + '月';
  let day = foo.getDate() + '日';
  let hours = foo.getHours();
  let minutes = foo.getMinutes();
  let week = foo.getDay();
  let time = {};
  switch (week) {
    case 0:
      week = '星期日';
      break;
    case 1:
      week = '星期一';
      break;
    case 2:
      week = '星期二';
      break;
    case 3:
      week = '星期三';
      break;
    case 4:
      week = '星期四';
      break;
    case 5:
      week = '星期五';
      break;
    case 6:
      week = '星期六';
      break;
    default:
      console.log('error');
  }
  return time = {
    month: month + day,
    hours: hours + ':' + minutes,
    week: week
  };
}

function _tagList() {
  let taglist = todolist.filter(function (ele) {
    return ele.tag === tags.tag;
  });
  return taglist;
}

/***/ }),

/***/ "./src/preload.js":
/*!************************!*\
  !*** ./src/preload.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    if (typeof item === 'string') {
      item = { src: item };
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
      cleanEvent();
    };
    item.image.src = item.src;
    //清除绑定的事件
    function cleanEvent() {
      item.image.onload = item.image.onerror = null;

      if (! --count && !isTimeout) {
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
/* harmony default export */ __webpack_exports__["default"] = (preload);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map