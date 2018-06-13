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

/***/ "./node_modules/constants-browserify/constants.json":
/*!**********************************************************!*\
  !*** ./node_modules/constants-browserify/constants.json ***!
  \**********************************************************/
/*! exports provided: O_RDONLY, O_WRONLY, O_RDWR, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOFOLLOW, O_SYNC, O_SYMLINK, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, E2BIG, EACCES, EADDRINUSE, EADDRNOTAVAIL, EAFNOSUPPORT, EAGAIN, EALREADY, EBADF, EBADMSG, EBUSY, ECANCELED, ECHILD, ECONNABORTED, ECONNREFUSED, ECONNRESET, EDEADLK, EDESTADDRREQ, EDOM, EDQUOT, EEXIST, EFAULT, EFBIG, EHOSTUNREACH, EIDRM, EILSEQ, EINPROGRESS, EINTR, EINVAL, EIO, EISCONN, EISDIR, ELOOP, EMFILE, EMLINK, EMSGSIZE, EMULTIHOP, ENAMETOOLONG, ENETDOWN, ENETRESET, ENETUNREACH, ENFILE, ENOBUFS, ENODATA, ENODEV, ENOENT, ENOEXEC, ENOLCK, ENOLINK, ENOMEM, ENOMSG, ENOPROTOOPT, ENOSPC, ENOSR, ENOSTR, ENOSYS, ENOTCONN, ENOTDIR, ENOTEMPTY, ENOTSOCK, ENOTSUP, ENOTTY, ENXIO, EOPNOTSUPP, EOVERFLOW, EPERM, EPIPE, EPROTO, EPROTONOSUPPORT, EPROTOTYPE, ERANGE, EROFS, ESPIPE, ESRCH, ESTALE, ETIME, ETIMEDOUT, ETXTBSY, EWOULDBLOCK, EXDEV, SIGHUP, SIGINT, SIGQUIT, SIGILL, SIGTRAP, SIGABRT, SIGIOT, SIGBUS, SIGFPE, SIGKILL, SIGUSR1, SIGSEGV, SIGUSR2, SIGPIPE, SIGALRM, SIGTERM, SIGCHLD, SIGCONT, SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU, SIGURG, SIGXCPU, SIGXFSZ, SIGVTALRM, SIGPROF, SIGWINCH, SIGIO, SIGSYS, SSL_OP_ALL, SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION, SSL_OP_CIPHER_SERVER_PREFERENCE, SSL_OP_CISCO_ANYCONNECT, SSL_OP_COOKIE_EXCHANGE, SSL_OP_CRYPTOPRO_TLSEXT_BUG, SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, SSL_OP_EPHEMERAL_RSA, SSL_OP_LEGACY_SERVER_CONNECT, SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER, SSL_OP_MICROSOFT_SESS_ID_BUG, SSL_OP_MSIE_SSLV2_RSA_PADDING, SSL_OP_NETSCAPE_CA_DN_BUG, SSL_OP_NETSCAPE_CHALLENGE_BUG, SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG, SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG, SSL_OP_NO_COMPRESSION, SSL_OP_NO_QUERY_MTU, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION, SSL_OP_NO_SSLv2, SSL_OP_NO_SSLv3, SSL_OP_NO_TICKET, SSL_OP_NO_TLSv1, SSL_OP_NO_TLSv1_1, SSL_OP_NO_TLSv1_2, SSL_OP_PKCS1_CHECK_1, SSL_OP_PKCS1_CHECK_2, SSL_OP_SINGLE_DH_USE, SSL_OP_SINGLE_ECDH_USE, SSL_OP_SSLEAY_080_CLIENT_DH_BUG, SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG, SSL_OP_TLS_BLOCK_PADDING_BUG, SSL_OP_TLS_D5_BUG, SSL_OP_TLS_ROLLBACK_BUG, ENGINE_METHOD_DSA, ENGINE_METHOD_DH, ENGINE_METHOD_RAND, ENGINE_METHOD_ECDH, ENGINE_METHOD_ECDSA, ENGINE_METHOD_CIPHERS, ENGINE_METHOD_DIGESTS, ENGINE_METHOD_STORE, ENGINE_METHOD_PKEY_METHS, ENGINE_METHOD_PKEY_ASN1_METHS, ENGINE_METHOD_ALL, ENGINE_METHOD_NONE, DH_CHECK_P_NOT_SAFE_PRIME, DH_CHECK_P_NOT_PRIME, DH_UNABLE_TO_CHECK_GENERATOR, DH_NOT_SUITABLE_GENERATOR, NPN_ENABLED, RSA_PKCS1_PADDING, RSA_SSLV23_PADDING, RSA_NO_PADDING, RSA_PKCS1_OAEP_PADDING, RSA_X931_PADDING, RSA_PKCS1_PSS_PADDING, POINT_CONVERSION_COMPRESSED, POINT_CONVERSION_UNCOMPRESSED, POINT_CONVERSION_HYBRID, F_OK, R_OK, W_OK, X_OK, UV_UDP_REUSEADDR, default */
/***/ (function(module) {

module.exports = {"O_RDONLY":0,"O_WRONLY":1,"O_RDWR":2,"S_IFMT":61440,"S_IFREG":32768,"S_IFDIR":16384,"S_IFCHR":8192,"S_IFBLK":24576,"S_IFIFO":4096,"S_IFLNK":40960,"S_IFSOCK":49152,"O_CREAT":512,"O_EXCL":2048,"O_NOCTTY":131072,"O_TRUNC":1024,"O_APPEND":8,"O_DIRECTORY":1048576,"O_NOFOLLOW":256,"O_SYNC":128,"O_SYMLINK":2097152,"O_NONBLOCK":4,"S_IRWXU":448,"S_IRUSR":256,"S_IWUSR":128,"S_IXUSR":64,"S_IRWXG":56,"S_IRGRP":32,"S_IWGRP":16,"S_IXGRP":8,"S_IRWXO":7,"S_IROTH":4,"S_IWOTH":2,"S_IXOTH":1,"E2BIG":7,"EACCES":13,"EADDRINUSE":48,"EADDRNOTAVAIL":49,"EAFNOSUPPORT":47,"EAGAIN":35,"EALREADY":37,"EBADF":9,"EBADMSG":94,"EBUSY":16,"ECANCELED":89,"ECHILD":10,"ECONNABORTED":53,"ECONNREFUSED":61,"ECONNRESET":54,"EDEADLK":11,"EDESTADDRREQ":39,"EDOM":33,"EDQUOT":69,"EEXIST":17,"EFAULT":14,"EFBIG":27,"EHOSTUNREACH":65,"EIDRM":90,"EILSEQ":92,"EINPROGRESS":36,"EINTR":4,"EINVAL":22,"EIO":5,"EISCONN":56,"EISDIR":21,"ELOOP":62,"EMFILE":24,"EMLINK":31,"EMSGSIZE":40,"EMULTIHOP":95,"ENAMETOOLONG":63,"ENETDOWN":50,"ENETRESET":52,"ENETUNREACH":51,"ENFILE":23,"ENOBUFS":55,"ENODATA":96,"ENODEV":19,"ENOENT":2,"ENOEXEC":8,"ENOLCK":77,"ENOLINK":97,"ENOMEM":12,"ENOMSG":91,"ENOPROTOOPT":42,"ENOSPC":28,"ENOSR":98,"ENOSTR":99,"ENOSYS":78,"ENOTCONN":57,"ENOTDIR":20,"ENOTEMPTY":66,"ENOTSOCK":38,"ENOTSUP":45,"ENOTTY":25,"ENXIO":6,"EOPNOTSUPP":102,"EOVERFLOW":84,"EPERM":1,"EPIPE":32,"EPROTO":100,"EPROTONOSUPPORT":43,"EPROTOTYPE":41,"ERANGE":34,"EROFS":30,"ESPIPE":29,"ESRCH":3,"ESTALE":70,"ETIME":101,"ETIMEDOUT":60,"ETXTBSY":26,"EWOULDBLOCK":35,"EXDEV":18,"SIGHUP":1,"SIGINT":2,"SIGQUIT":3,"SIGILL":4,"SIGTRAP":5,"SIGABRT":6,"SIGIOT":6,"SIGBUS":10,"SIGFPE":8,"SIGKILL":9,"SIGUSR1":30,"SIGSEGV":11,"SIGUSR2":31,"SIGPIPE":13,"SIGALRM":14,"SIGTERM":15,"SIGCHLD":20,"SIGCONT":19,"SIGSTOP":17,"SIGTSTP":18,"SIGTTIN":21,"SIGTTOU":22,"SIGURG":16,"SIGXCPU":24,"SIGXFSZ":25,"SIGVTALRM":26,"SIGPROF":27,"SIGWINCH":28,"SIGIO":23,"SIGSYS":12,"SSL_OP_ALL":2147486719,"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION":262144,"SSL_OP_CIPHER_SERVER_PREFERENCE":4194304,"SSL_OP_CISCO_ANYCONNECT":32768,"SSL_OP_COOKIE_EXCHANGE":8192,"SSL_OP_CRYPTOPRO_TLSEXT_BUG":2147483648,"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS":2048,"SSL_OP_EPHEMERAL_RSA":0,"SSL_OP_LEGACY_SERVER_CONNECT":4,"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER":32,"SSL_OP_MICROSOFT_SESS_ID_BUG":1,"SSL_OP_MSIE_SSLV2_RSA_PADDING":0,"SSL_OP_NETSCAPE_CA_DN_BUG":536870912,"SSL_OP_NETSCAPE_CHALLENGE_BUG":2,"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG":1073741824,"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG":8,"SSL_OP_NO_COMPRESSION":131072,"SSL_OP_NO_QUERY_MTU":4096,"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION":65536,"SSL_OP_NO_SSLv2":16777216,"SSL_OP_NO_SSLv3":33554432,"SSL_OP_NO_TICKET":16384,"SSL_OP_NO_TLSv1":67108864,"SSL_OP_NO_TLSv1_1":268435456,"SSL_OP_NO_TLSv1_2":134217728,"SSL_OP_PKCS1_CHECK_1":0,"SSL_OP_PKCS1_CHECK_2":0,"SSL_OP_SINGLE_DH_USE":1048576,"SSL_OP_SINGLE_ECDH_USE":524288,"SSL_OP_SSLEAY_080_CLIENT_DH_BUG":128,"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG":0,"SSL_OP_TLS_BLOCK_PADDING_BUG":512,"SSL_OP_TLS_D5_BUG":256,"SSL_OP_TLS_ROLLBACK_BUG":8388608,"ENGINE_METHOD_DSA":2,"ENGINE_METHOD_DH":4,"ENGINE_METHOD_RAND":8,"ENGINE_METHOD_ECDH":16,"ENGINE_METHOD_ECDSA":32,"ENGINE_METHOD_CIPHERS":64,"ENGINE_METHOD_DIGESTS":128,"ENGINE_METHOD_STORE":256,"ENGINE_METHOD_PKEY_METHS":512,"ENGINE_METHOD_PKEY_ASN1_METHS":1024,"ENGINE_METHOD_ALL":65535,"ENGINE_METHOD_NONE":0,"DH_CHECK_P_NOT_SAFE_PRIME":2,"DH_CHECK_P_NOT_PRIME":1,"DH_UNABLE_TO_CHECK_GENERATOR":4,"DH_NOT_SUITABLE_GENERATOR":8,"NPN_ENABLED":1,"RSA_PKCS1_PADDING":1,"RSA_SSLV23_PADDING":2,"RSA_NO_PADDING":3,"RSA_PKCS1_OAEP_PADDING":4,"RSA_X931_PADDING":5,"RSA_PKCS1_PSS_PADDING":6,"POINT_CONVERSION_COMPRESSED":2,"POINT_CONVERSION_UNCOMPRESSED":4,"POINT_CONVERSION_HYBRID":6,"F_OK":0,"R_OK":4,"W_OK":2,"X_OK":1,"UV_UDP_REUSEADDR":4};

/***/ }),

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
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants */ "./node_modules/constants-browserify/constants.json");
var constants__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/Object.assign({}, constants__WEBPACK_IMPORTED_MODULE_4__, {"default": constants__WEBPACK_IMPORTED_MODULE_4__});






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
  let content = document.querySelectorAll('.content');
  //收件箱
  _inputEvent(content[0], function (input) {
    _addItem(input.value);
    input.value = '';
  });
  //今天
  _inputEvent(content[1], function (input) {
    _addItem(input.value);
    input.value = '';
  });
  //未来7天
  _inputEvent(content[2], function (input) {
    let week = document.querySelectorAll('.week');
    let index = Array.prototype.indexOf.call(week, input.parentNode.parentNode);
    _addItem(input.value, index);
    input.value = '';
  });
  _inputEvent(content[3], function (input) {
    _addItem(input.value, null, tags.tag);
    input.value = '';
  });
}
//添加任务事件函数
function _inputEvent(ele, callback) {
  //点击添加按钮添加任务
  addEvent(ele, 'click', event => {
    let target = event.target || event.srcElement;
    if (target.nodeName === 'BUTTON') {
      let input = target.parentNode.children[0];
      if (!input.value) {
        return;
      }
      callback(input);
    } else {
      return;
    }
  });
  //回车键添加任务
  _enter(ele, callback);
}
//回车键输入事件
function _enter(ele, callback) {
  //兼容safari不支持keyup
  addEvent(ele, 'keydown', function (event) {
    let key = event.which || event.keyCode || event.charCode;
    if (key === 13) {
      addEvent(ele, 'keyup', _handle(event));
      ele.removeEventListener("keyup", _handle, false);

      function _handle(event) {
        let target = event.target || event.srcElement;
        let key = event.which || event.keyCode || event.charCode;
        if (target.nodeName === 'INPUT') {
          /*Do something. 调用一些方法*/
          if (!target.value) {
            return;
          }
          callback(target);
        }
      }
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
  _clearList();
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
function _clearList() {
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

//TODO列表操作部分
function listHandle() {
  let ul = document.getElementsByClassName('todolist');
  let inbox = document.getElementById('inbox');
  let today = document.getElementById('today');
  let weeks = document.getElementsByClassName('week');
  let proTag = document.getElementById('pro-tag');
  addEvent(inbox, 'click', event => {
    let target = event.target || event.srcElement;
    //获取点击的li
    let node = _getNode(target, 'li', 'ul');
    //完成任务
    _getTask(todolist, node);
    //删除点击的那条任务
    if (target.nodeName === 'EM') {
      _deleteItem(todolist, node);
    }
  });
  addEvent(today, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    //获取点击的li
    let node = _getNode(target, 'li', 'ul');
    _getTask(todayList, node);
    //删除任务
    if (target.nodeName === 'EM') {
      _deleteItem(todayList, node);
    }
  });

  for (let i = 0, len = weeks.length; i < len; i++) {
    addEvent(ul[i + 2], 'click', event => {
      let target = event.target || event.srcElement;
      //未来7天中某一天的todo列表
      let weekList = todolist.filter(ele => ele.time === getNowTime(i).month);
      let node = _getNode(target, 'li', 'ul');
      _getTask(weekList, node);
      if (target.nodeName === 'EM') {
        _deleteItem(weekList, node);
      }
    });
  }
  addEvent(proTag, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    let node = _getNode(target, 'li', 'ul');
    _getTask(_tagList(), node);
    if (target.nodeName === 'EM') {
      _deleteItem(_tagList(), node);
    }
  });
}
//返回目标节点，用于事件代理，使目标节点不受子节点影响
function _getNode(node, target, parent) {
  if (node.nodeName.toLowerCase() === parent) {
    return;
  }
  if (node.nodeName.toLowerCase() === target) {
    return node;
  } else {
    return _getNode(node.parentNode, target, parent);
  }
}
//完成一条任务
function _getTask(somelist, target) {
  if (!target) {
    return;
  }
  //返回列表元素的位置
  let index = Array.prototype.indexOf.call(target.parentNode.children, target);
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
  let index = Array.prototype.indexOf.call(target.parentNode.children, target);
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].deleteDB(somelist[index].tick, _refresh);
}
//刷新数据
function _refresh() {
  todolist = [];
  _indexDB__WEBPACK_IMPORTED_MODULE_0__["default"].getAllDB(todolist, showList);
}
//列表排序 已完成的排后面
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
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return time = {
    month: month + day,
    hours: hours + ':' + minutes,
    week: weeks[week]
  };
}

//标签列表
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