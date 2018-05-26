(function () {
  'use strict';
  //task list init
  let tags = '今天';
  let todolist = [];

  function init() {
    let time = document.getElementsByClassName('time');
    time[0].innerHTML = getNowTime().week + getNowTime().month;
    additem();
    getItem();
    initDb();
    listMenu();
    weeks();
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
    ).toString(36) + Date.now().toString(36);
  }
  
  //添加待办事项
  function additem() {
    let btn = document.getElementsByClassName('btn');
    let addList = document.getElementsByClassName('in-edit');
    let todoitem = {};
    function pushData(buttom, list, addDay) {
      addEvent(buttom, 'click', function () {
        if (!list.value) {
          return;
        }
  
        todoitem = {
          id: ID(),
          time: getNowTime(addDay).month,
          timeing : Date.now(),
          task: list.value,
          //标记是否完成
          status: false,
          tag: tags,
        };
        todolist.unshift(todoitem);
        list.value = '';
        addDB();
        listShow();
      });
    }
    pushData(btn[0], addList[0]);
    pushData(btn[1], addList[1]);
    pushData(btn[2], addList[2]);
    pushData(btn[3], addList[3], 1);
    pushData(btn[4], addList[4], 2);
    pushData(btn[5], addList[5], 3);
    pushData(btn[6], addList[6], 4);
    pushData(btn[7], addList[7], 5);
    pushData(btn[8], addList[8], 6);

  }
  // 显示在列表中
  function listShow() {
    let list = document.getElementsByClassName('todolist');
    let obj = {};

    for (let i = 0, li = list.length ; i < li; i++) {
      list[i].innerHTML = '';
    }

    if (!todolist.length && tags === '今天') {      
      list[0].innerHTML = '';
      let div = document.createElement('div');
      let li = document.createElement('li');
      let box = list[0].appendChild(li);
      box.appendChild(div).innerHTML = '<div></div><div>你的任务完成了！#TodolistZero</div>';
    }
    if (!dayList().day1.length) {
      list[1].innerHTML = '';
      let div1 = document.createElement('div');
      let li1 = document.createElement('li');
      let box1 = list[1].appendChild(li1);
      console.log(list[1])
      box1.appendChild(div1).innerHTML = '<div></div><div>你的任务完成了！#TodolistZero</div>';
    }
    if (tags === '今天') {
      obj = todolist;
      createDom(list[1], dayList().day1);
    } else {
      obj  = tagList();
      createDom(list[1], obj);
    }
    console.log(obj)
    todolist.sort(function (a, b) {
      return a.status - b.status;
    });   
    
    createDom(list[0], todolist);
    
    createDom(list[2], dayList().day1); 
    createDom(list[3], dayList().day2);
    createDom(list[4], dayList().day3);
    createDom(list[5], dayList().day4);
    createDom(list[6], dayList().day5);
    createDom(list[7], dayList().day6);
    createDom(list[8], dayList().day7);
    
    function createDom(list, obj) {
      obj.forEach((ele) => {
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
    
  }

  function dayList() {
    let day = {
      day1: [],
      day2: [], 
      day3: [], 
      day4: [], 
      day5: [], 
      day6: [],
      day7: []
    };
    day.day1 = todolist.filter(function (ele) {
      return ele.time === getNowTime().month; 
    });
    day.day2 = todolist.filter(function (ele) {
      return ele.time === getNowTime(1).month;   
    });
    day.day3 = todolist.filter(function (ele) {
      return ele.time === getNowTime(2).month;    
    }); 
    day.day4 = todolist.filter(function (ele) {
      return ele.time === getNowTime(3).month;   
    }); 
    day.day5 = todolist.filter(function (ele) {
      return ele.time === getNowTime(4).month;   
    }); 
    day.day6 = todolist.filter(function (ele) {
      return ele.time === getNowTime(5).month;    
    }); 
    day.day7 = todolist.filter(function (ele) {
      return ele.time === getNowTime(6).month;    
    });  
    return day;
    
  }
  //完成任务
  function getItem() {
    let list = document.getElementsByClassName('todolist');
    for (let i = 0; i < list.length; i++) {
      addEvent(list[i], 'click', function (e) {
        //兼容性处理
        e = e || event;
        let target = e.target || e.srcElement;
        (function getNode(target) {
          if (target.nodeName === 'P') {
            markItem();
          } else if (target.nodeName !== 'LI'){
            getNode(target.parentNode);
          }
          return;  
        })(target);
        function markItem() {
          let liItem = target.parentNode;
          let index = Array.prototype.indexOf.call(liItem.parentNode.children, liItem);
          if (i === 0) {
            if (tags === '今天') {  
              todolist[index].status = true;
              loopArr();
            } else {
              let taglist = todolist.filter(function (ele) {
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
          if (i === 1 || i === 2) {
            let id = dayList().day1[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 3) {
            let id = dayList().day2[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 4) {
            let id = dayList().day3[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 5) {
            let id = dayList().day4[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 6) {
            let id = dayList().day5[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 7) {
            let id = dayList().day6[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                ele.status = true;
                loopArr();
              }
            });                  
          }
          if (i === 8) {
            let id = dayList().day7[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
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
          if (i === 0) {
            let id = todolist[index].id;
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 1 || i === 2) {
            if (i === 1) {
              if (tags !== '今天') {
                let id = tagList()[index].id;
                todolist.forEach(function (ele) {
                  if (ele.id === id) {
                    deleteDB(ele.id);
                    todolist = []; 
                    getAllDB();
                  }
                });                  
              } 
            }
            let id = dayList().day1[index].id;
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 3) {
            let id = dayList().day2[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 4) {
            let id = dayList().day3[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 5) {
            let id = dayList().day4[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 6) {
            let id = dayList().day5[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 7) {
            let id = dayList().day6[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
          if (i === 8) {
            let id = dayList().day7[index].id;  
            todolist.forEach(function (ele) {
              if (ele.id === id) {
                deleteDB(ele.id);
                todolist = []; 
                getAllDB();
              }
            });                  
          }
            
        }
        function loopArr() {
          addDB();
          if (tags !== '今天') {
            listShow();
          } else {
            listShow();
          }        
        }
     
      });
    }
  
  }
  
  function getNowTime(addDay) {
    addDay = (addDay || 0);
    let foo = new Date();
    foo.setDate(foo.getDate() + addDay); 
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
      console.log('error');
    }
    return time = {
      month: month + day,
      hours: hours + ':' + minutes,
      week: week,
    };
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
    req.onsuccess = function () {
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
      objectStore.createIndex('timeing', 'timeing', {unique: false});
      console.log('创建对象仓库成功');
      
    };
  }

  function addDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    // 当所有的数据都被增加到数据库时执行一些操作
    transaction.oncomplete = function () {
      console.log('All done!');
    };
    transaction.onerror = function () {
      console.log('error');
    };
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    for (let i in todolist) {
      const req = objectStore.put(todolist[i]);
      req.onsuccess = function () {
        // console.log(todolist);
      };
    }
  }

  function deleteDB(id) {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    objectStore.delete(id);
    objectStore.onsuccess = function () {
      console.log('删除成功');
    };
  }
  function getDB() {
    let transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    let objectStore = transaction.objectStore(DB_STORE_NAME);
    let req = objectStore.get(13);
    req.onsuccess = function () {
    };

  }

  function getAllDB() {
    let objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
    objectStore.index('timeing').openCursor(null, 'prev').onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        todolist.push(cursor.value);
        cursor.continue();
      } else {
        listShow();
        return;
      }
      listShow();

    };
  }
  function listMenu() {
    let ul = document.getElementsByClassName('project-list')[0];
    let menu = document.getElementsByClassName('fixmenu')[0];
    let tag = document.getElementsByClassName('tag')[1].children[0];
    let nav = document.getElementsByClassName('nav-toggle')[0];
    let lmenu = document.getElementsByClassName('left-menu')[0];
    let box = document.getElementsByClassName('right-box')[0];
    let filter = document.getElementsByClassName('filter');
    let content = document.getElementsByClassName('content');
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
        
        content[0].style.display = '';
        content[1].style.display = 'block';
        content[2].style.display = '';
        
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
    });
    addEvent(box, 'click', function () {
      lmenu.style.display = '';
    });
    addEvent(filter[0], 'click', function () {
      content[0].style.display = 'block';
      content[1].style.display = 'none';
      content[2].style.display = '';
    });
    addEvent(filter[1], 'click', function () {
      window.location.reload();
    });
    addEvent(filter[2], 'click', function () {
      content[0].style.display = '';
      content[1].style.display = 'none';
      content[2].style.display = 'block';
    });
  }

  function tagList() {        
    let taglist = todolist.filter(function (ele) {
      return tags === ele.tag;
    });
    return taglist;
  }     
  function weeks() {
    let week = document.getElementsByClassName('week');
    for (let i = 2; i < week.length; i++) {
      week[i].children[0].children[0].innerHTML = getNowTime(i).week;
    }
  }
  init();

})();

