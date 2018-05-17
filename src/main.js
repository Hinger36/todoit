(function () {
  'use strict'
  //task list init
  let todolist = [];

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
    ).toString(36) + Date.now().toString(36)
  }
  
  //添加待办事项
  function additem() {
    let btn = document.getElementsByClassName('btn')[0];
    let addList = document.getElementById('add-list');
    let todoitem = {};
    addEvent(btn, 'click', function () {
      if (!addList.value) {
        return;
      }
      todoitem = {
        id: ID(),
        time: getNowTime(),
        task: addList.value,
        //标记是否完成
        status: false,
      };
      todolist.unshift(todoitem);
      console.log(todolist);
      addList.value = '';
      addDB();
      listShow();
    })

  }
  //显示在列表中
  function listShow() {
    let list = document.getElementsByClassName('todolist')[0];   
    list.innerHTML = '';

    todolist.forEach((ele, index, array) => {
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
  //完成任务
  function getItem() {
    let list = document.getElementsByClassName('todolist')[0];
    addEvent(list, 'click', function (e) {
      //兼容性处理
      e = e || event;
      let target = e.target || e.srcElement;
     
      if (target.nodeName === 'P') {
        let liItem = target.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
        todolist[index].status = true;
      }
      if (target.nodeName === 'I') {
        let liItem = target.parentNode.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
        todolist[index].status = true;

        target.parentNode.style.textDecoration = 'line-through';
        target.parentNode.children[0].style.background = 'url(../images/success.png) no-repeat';
      }
      if (target.nodeName === 'EM') {
        //删除一条待办事项
        let liItem = target.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
        let item = todolist.splice(index, 1)[0];
        console.log(item.id);
        deleteDB(item.id);    
      }
      todolist.forEach((ele, index, array) => {
        if (ele.status) {
          let fini = array.splice(index, 1)[0];
          array.push(fini);
        }
      });
      addDB();
      listShow();
    });
  }
  
  function getNowTime() {
    let foo = new Date();
    let now = foo.getMonth() + 1 + '月' + foo.getDate() + '日' + foo.getHours() + ':' + foo.getMinutes();
    return now;
  }
  function init() {
    additem();
    getItem();
    initDb();
  }
  //
  //
  //indexedDB数据库部分
  const DB_NAME = 'todoit-indexedDB';
  const DB_VERSION = 1;
  const DB_STORE_NAME = 'todolist';

  let db;
  

  function initDb() {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (event) {
      db = this.result;
      console.log("initDb DONE");
      getAllDB();
    };
    req.onerror = function (event) {
      console.log("initDb:", event.target.errorCode);
    };
    req.onupgradeneeded = function (event) {
      let db = event.target.result;
      //创建一个对象存储空间
      let objectStore = db.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: false });
      console.log('创建对象仓库成功');
      
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
        // console.log(todolist);
      }
    }
  }

  function deleteDB(id) {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    objectStore.delete(id);
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
        console.log(cursor.value)
        todolist.push(cursor.value);
        cursor.continue();
      } else {
        console.log('not found');
      }
      if (todolist) {
        listShow()
      }
    }
  }

  init();


  
})()

