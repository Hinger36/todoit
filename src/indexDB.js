(function () {
  'use strict'

  const DB_NAME = 'todoit-indexedDB';
  const DB_VERSION = 1;
  const DB_STORE_NAME = 'todolist';

  let db;
  let todolist = [{id: 11,time: 343,task: 'dasdsdfd',status: false,},
    {id: 12,time: 454,task: 'gfgd',status: false,},
    {id: 13,time: 564,task: 'h6y',status: false,},
    {id: 14,time: 764,task: 'o8i8',status: false,}];
  function init() {
    initDb();
    
  }

  function initDb() {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (event) {
      db = this.result;
      console.log("initDb DONE");
      getAllDB()
    };
    req.onerror = function (event) {
      console.log("initDb:", event.target.errorCode);
    };
    req.onupgradeneeded = function (event) {
      let db = event.target.result;
      //创建一个对象存储空间
      let objectStore = db.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: false });
      console.log('创建对象仓库成功');
      // db.transaction(DB_STORE_NAME, 'readwrite');
      
    };
  }

  function addDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    // 当所有的数据都被增加到数据库时执行一些操作
    transaction.oncomplete = function (event) {
      console.log('All done!');
    };
    transaction.onerror = function (event) {
      console.log('error');
    };
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    for (let i in todolist) {
      const req = objectStore.put(todolist[i]);
      req.onsuccess = function (event) {
        console.log(todolist);
      }
    }
  }

  function deleteDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    objectStore.delete(13);
    console.log(objectStore)
    objectStore.onsuccess = function (event) {
      console.log('删除成功');
    }
  }
  function getDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    let req = objectStore.get(13);
    console.log(req)
    req.onsuccess = function (event) {
      console.log(req.result.task);
    }

  }

  function getAllDB() {
    let objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        console.log(cursor.value.task);
        cursor.continue();
      } else {
        console.log('not found');
      }
    }
  }

  
  
  init();


})();

