//数据库名称
const DB_NAME = 'todoit-indexedDB';
//数据库版本号
const DB_VERSION = 1;
//对象仓库名称
const DB_STORE_NAME = 'todolist';
const KEYPATH = 'tick';
//索引
const INDEX = {
  IndexName: 'id',
  keyPath: 'id',
  unique: false,
}
let db;

//从删库到跑路
function deleteIndexDB() {
  var DBDeleteRequest = window.indexedDB.deleteDatabase(DB_NAME);

  DBDeleteRequest.onerror = function(event) {
    console.log("Error deleting database.");
  };
  
  DBDeleteRequest.onsuccess = function(event) {
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
    _createObjectStoreHandle();
    console.log('创建对象仓库成功');
  };
  openReq.onblocked = () => {
    console.log('上一次的数据库连接还未关闭');
  }
}
//创建对象仓库
function _createObjectStoreHandle() {
  const store = db.createObjectStore(DB_STORE_NAME, { keyPath: KEYPATH, autoIncrement: false});
  _createIndex(store, INDEX);
}
//创建索引
function _createIndex(store, index) {
  store.createIndex(index.IndexName, index.keyPath, {unique: index.unique});
}
//建立事务
function _createTransation() {
  const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
  transaction.oncomplete = () => {
    console.log('事务完成');
  }
  transaction.onerror = () => {
    console.log('事务出错');
  }
  transaction.onabort = () => {
    console.log('事务中断');
  }
  return transaction;
}
/**
 * 添加数据
 * @param {需要存储的数据对象或者数组} obj 
 */
function addDB(obj, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  for (let i in obj) {
    store.put(obj[i])
  		  .onsuccess = () => {
          callback();
          console.log('添加成功');
        }
    }
} 
//删除一条数据
function deleteDB(keyPath, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.delete(keyPath)
      .onsuccess = () => {
        console.log('删除成功');
        callback();
      }
}

//获取一条数据
function getDB(keyPath, arr) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.get(keyPath)
      .onsuccess = event => {
         let cursor = event.target.result;
         if (cursor) {
           obj.push(cursor);
         }
    }
}

//获取全部数据
function getAllDB(arr, callback) {
  let store = _createTransation().objectStore(DB_STORE_NAME);
  store.getAll()
       .onsuccess = event => {
         let cursor = event.target.result;
         if (cursor) {
           cursor.forEach(x => arr.push(x));
           callback();
         }
    }
}

export default {
  initDB,
  addDB,
  deleteDB,
  getDB,
  getAllDB,
  deleteIndexDB
}
