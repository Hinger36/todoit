(function () {
  'use strict'
  //task list init
  let tags = '今天';
  let todolist = [];


  function init() {
    let time = document.getElementsByClassName('time')[0];
    time.innerHTML = getNowTime().week;
    additem();
    getItem();
    initDb();
    listMenu()
  }

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
        time: getNowTime().day,
        task: addList.value,
        //标记是否完成
        status: false,
        tag: tags,
      };
      todolist.unshift(todoitem);
      addList.value = '';
      addDB();
      listShow();
    })

  }
  //显示在列表中
  function listShow() {
    let obj = {};
    if (todolist.length === 0 && tags === '今天') {
      window.location.reload()
    }
    if (tags === '今天') {
      obj = todolist;
    } else {
      obj  = tagList();
    }
    let list = document.getElementsByClassName('todolist')[0];   
    list.innerHTML = '';

      obj.forEach((ele, index, array) => {
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
      function getNode(target) {
        if (target.nodeName === 'P') {
          markItem();
        } else if (target.nodeName !== 'LI'){
          getNode(target.parentNode);
        }
        return;

      }
      getNode(target);
      function markItem() {
        let liItem = target.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
        if (tags === '今天') {  
          todolist[index].status = true;
          loopArr();
        } else {
          let taglist = todolist.filter(function (ele, index, arr ) {
            return  ele.tag === tags;
          });
          todolist.forEach(function (ele) {
            if (ele.id === taglist[index].id) {
              ele.status = true;
              loopArr();
            }
          });
        }       
      }
      
      if (target.nodeName === 'EM') {
        //删除一条待办事项
        let liItem = target.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
        let item = todolist.splice(index, 1)[0];
        deleteDB(item.id);   
        loopArr(); 
      }
      function loopArr() {
        todolist.forEach((ele, index, array) => {
          if (ele.status) {
            let fini = array.splice(index, 1)[0];
            array.push(fini);
          }
        });
        addDB();
        if (tags !== '今天') {
          listShow();
        } else {
          listShow();
        }        
      }
   
    });
  }
  
  function getNowTime() {
    let foo = new Date();
    let month = foo.getMonth() + 1 + '月';
    let day = foo.getDate() + '日';
    let hours = foo.getHours();
    let minutes = foo.getMinutes();
    let week = foo.getDay();
    let time = {};
    switch(week) {
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
        console.log('error')
    }
    time = {
      day: month + day + hours + ':' + minutes,
      week: week + month + day
    }
    return time;
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
    objectStore.onsuccess = function (event) {
      console.log('删除成功');
    }
  }
  function getDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    let req = objectStore.get(13);
    req.onsuccess = function (event) {
    }

  }

  function getAllDB() {
    let objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    objectStore.openCursor().onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        todolist.push(cursor.value);
        cursor.continue();
      } else {
        console.log('not found');
      }
      if (todolist.length !== 0) {
        listShow();
      } 
    }
  }
  function listMenu() {
    let ul = document.getElementsByClassName('project-list')[0];
    let menu = document.getElementsByClassName('fixmenu')[0];
    let tag = document.getElementsByClassName('tag')[0].children[0];
    let nav = document.getElementsByClassName('nav-toggle')[0];
    let lmenu = document.getElementsByClassName('left-menu')[0];
    addEvent(menu, 'click', function (event) {
      event.stopPropagation();
        if (!ul.style.display) {
          ul.style.display = 'none';
        } else {
          ul.style.display = '';
        }      
    });
    addEvent(ul, 'click', function (event) {
      let target = event.target;
      if (target.nodeName === 'LI') {
        tag.innerHTML = target.innerHTML;
        tags = tag.innerHTML;
        
        listShow();
       
      }    
    });
    addEvent(nav, 'click', function () {
      if (!lmenu.style.display) {
        lmenu.style.display = 'block';
      } else {
        lmenu.style.display = '';
      }    
    })
  }
  function tagList() {        
    let taglist = todolist.filter(function (ele, index, arr) {
     return tags === ele.tag;
    });
    return taglist;
  }     
  
  init();

})()

