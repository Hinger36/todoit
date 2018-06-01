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
    console.log('事务完成');
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
      console.log('添加成功');
    };
  }
}
//删除一条数据
function deleteDB(keyPath, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.delete(keyPath).onsuccess = () => {
    console.log('删除成功');
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


// import inter from './interactive'

const addEvent = _api__WEBPACK_IMPORTED_MODULE_1__["default"].addEvent;
const ID = _api__WEBPACK_IMPORTED_MODULE_1__["default"].ID;
let todolist = [];
let tags = '';

!function init() {
  let time = document.getElementsByClassName('time');
  for (let i = 1, len = time.length; i < len; i++) {
    time[i].innerHTML = getNowTime(i - 1).week + getNowTime(i - 1).month;
  }
  time[0].innerHTML = getNowTime().week + getNowTime().month;
  //DBbase.deleteIndexDB()
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].initDB(todolist, showList);
  addTodo();
  listMenu();
  weeks();
  listHandle();
}();

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
      _addItem(input.value, null, tags);
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
  let weeks = document.getElementsByClassName('week');
  let proTag = document.getElementById('pro-tag');
  _sort();
  let todayList = todolist.filter(ele => ele.time === getNowTime().month);
  clearList();
  if (!todolist.length) {
    _indexImg(inbox);
  }
  if (!todayList.length) {
    _indexImg(today);
  }
  _createList(inbox, todolist);
  _createList(today, todayList);
  for (let i = 0, len = weeks.length; i < len; i++) {
    let week = weeks[i].children[2].children[0];
    let weekList = todolist.filter(ele => ele.time === getNowTime(i).month);
    _createList(week, weekList);
  }
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
    if (target.nodeName === 'EM') {
      _deleteItem(todolist, target);
    }
    if (target.nodeName === 'P') {
      _getTask(todolist, target);
    }
  });
  addEvent(today, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    if (target.nodeName === 'EM') {
      _deleteItem(todayList, target);
    }
    if (target.nodeName === 'P') {
      _getTask(todayList, target);
    }
  });

  for (let i = 0, len = weeks.length; i < len; i++) {
    addEvent(ul[i + 2], 'click', event => {
      let target = event.target || event.srcElement;
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
    return ele.tag === tags;
  });
  return taglist;
}
function weeks() {
  let week = document.getElementsByClassName('week');
  for (let i = 2; i < week.length; i++) {
    week[i].children[0].children[0].innerHTML = getNowTime(i).week;
  }
}

function listMenu() {

  let ul = document.getElementsByClassName('project-list')[0];
  let menu = document.getElementsByClassName('fixmenu')[0];
  let tag = document.getElementsByClassName('tag')[9].children[0];
  let nav = document.getElementsByClassName('nav-toggle')[0];
  let lmenu = document.getElementsByClassName('left-menu')[0];
  let box = document.getElementsByClassName('right-box')[0];
  let filter = document.getElementsByClassName('filter');
  let content = document.getElementsByClassName('content');
  let isHiden = true;
  let isShow = true;
  let timer = 0;
  addEvent(menu, 'click', function (event) {
    event.stopPropagation();
    if (isShow) {
      // ul.style.display = 'none';
      ul.style.top = '-180px';
      ul.style.transition = '0.6s';
      menu.children[0].children[0].style.transform = 'rotate(180deg)';
      menu.children[0].children[0].style.transition = '0.6s';
    } else {
      ul.style.top = '';
      ul.style.transition = '0.6s';
      menu.children[0].children[0].style.transform = '';
      menu.children[0].children[0].style.transition = '0.6s';
    }
    isShow = !isShow;
  });
  addEvent(ul, 'click', function (event) {
    let target = event.target;
    if (target.nodeName === 'LI') {

      content[0].style.display = '';
      content[1].style.display = 'none';
      content[2].style.display = '';
      content[3].style.display = 'block';

      tag.innerHTML = target.innerText;
      tags = tag.innerHTML;
      showList();
    }
  });
  addEvent(nav, 'click', function () {
    if (isHiden) {
      lmenu.style.left = '0';
      lmenu.style.transition = '0.6s';
    } else {
      lmenu.style.left = '';
      lmenu.style.transition = '0.6s';
    }
    isHiden = !isHiden;
  });
  addEvent(box, 'click', function () {
    lmenu.style.left = '';
    lmenu.style.transition = '0.6s';
  });

  addEvent(filter[0], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = 'block';
    filter[0].style.backgroundColor = '#fff';
    content[1].style.display = 'none';
    content[2].style.display = '';
    content[3].style.display = '';
  });
  addEvent(filter[1], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = '';
    content[1].style.display = 'block';
    filter[1].style.backgroundColor = '#fff';
    content[2].style.display = '';
    content[3].style.display = '';
  });
  addEvent(filter[2], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = '';
    content[1].style.display = 'none';
    content[2].style.display = 'block';
    content[3].style.display = '';
    filter[2].style.backgroundColor = '#fff';
  });
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map