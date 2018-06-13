import DBbase from './indexDB';
import api from './api';
import inter from './interactive'
import load from './preload'
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

//事件封装函数
const addEvent = api.addEvent;
//随机数ID
const ID = api.ID;
let todolist = [];
let tags = inter.tags;
let images = [
  './images/736b25b3212facd336d9bc0fd047c07e.png',
  './images/delete.png',
  './images/success.png',
  './images/webwxgetmsgimg.png'
];

(function init() {
  //初始化数据库
  DBbase.initDB(todolist, showList);

  time();
  addTodo();
  listHandle();
  //预加载图片
  load(images,function(e) {
    console.log(e)
  });

  //交互部分
  inter.tagMenu(showList);
  inter.leftMenu();
  inter.menuBtn();
  
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
    let week = document.querySelectorAll('.week')
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
    } 
    else {
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
  let weeks = document.querySelectorAll('.week .todolist')
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
      _deleteItem(todayList, node)
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
        _deleteItem(weekList, node)
      } 
    });
  }
  addEvent(proTag, 'click', event => {
    let target = event.target || event.srcElement;
    let todayList = todolist.filter(ele => ele.time === getNowTime().month);
    let node = _getNode(target, 'li', 'ul');
    _getTask(_tagList(), node);
    if (target.nodeName === 'EM') {
      _deleteItem(_tagList(), node)
    } 
  });
}
//返回目标节点，用于事件代理，使目标节点不受子节点影响
function _getNode(node, target, parent) {
  if (node.nodeName.toLowerCase() === parent) {
    return;
  }
  if(node.nodeName.toLowerCase() === target) {
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
  let index = Array.prototype.indexOf.call(target.parentNode.children, target);
  DBbase.deleteDB(somelist[index].tick, _refresh);
}
//刷新数据
function _refresh() {
  todolist = [];
  DBbase.getAllDB(todolist, showList);
}
//列表排序 已完成的排后面
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
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return time = {
    month: month + day,
    hours: hours + ':' + minutes,
    week: weeks[week],
  };
}

//标签列表
function _tagList() {        
  let taglist = todolist.filter(function (ele) {
    return ele.tag === tags.tag;
  });
  return taglist;
}

