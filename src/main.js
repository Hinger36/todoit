import DBbase from './indexDB';
import api from './api';
import inter from './interactive'

//事件封装函数
const addEvent = api.addEvent;
//随机数ID
const ID = api.ID;
let todolist = [];
let tags = inter.tags;

(function init() {
  let time = document.getElementsByClassName('time');
  for (let i = 1, len = time.length; i < len; i++) {
    time[i].innerHTML = getNowTime(i - 1).week + getNowTime(i - 1).month;     
  }
  time[0].innerHTML = getNowTime().week + getNowTime().month;
  //DBbase.deleteIndexDB()
  DBbase.initDB(todolist, showList);
  addTodo();
  weeks();
  listHandle();

  //交互部分
  inter.tagMenu(showList);
  inter.leftMenu();
  inter.menuBtn();
  
})();
  

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
    tick : Date.now(),
    task: task,
    time: getNowTime(day).month,
    //标记是否完成
    status: false,
    tag: tag,
  };
  todolist.unshift(todoitem);
  DBbase.addDB(todolist, showList);
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
    //删除点击的那条任务
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
      _deleteItem(todayList, target)
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
        _deleteItem(weekList, target)
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
      _deleteItem(_tagList(), target)
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
  todolist.forEach( ele => {
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
    DBbase.addDB(todolist, showList);
  }  
}
//删除一条数据
function _deleteItem(somelist, target) {
  let index = Array.prototype.indexOf.call(target.parentNode.parentNode.children, target.parentNode);
  DBbase.deleteDB(somelist[index].tick, _refresh);
}
//刷新数据
function _refresh() {
  todolist = [];
  DBbase.getAllDB(todolist, showList);
}
function _sort() {
  todolist.sort((a, b) => a.status - b.status);
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
 
function _tagList() {        
  let taglist = todolist.filter(function (ele) {
    return ele.tag === tags.tag;
  });
  return taglist;
}     
function weeks() {
  let week = document.getElementsByClassName('week');
  for (let i = 2; i < week.length; i++) {
    week[i].children[0].children[0].innerHTML = getNowTime(i).week;
  }
}
