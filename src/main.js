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
        time: getNowTime(),
        task: addList.value,
      };
      todolist.push(todoitem);
      console.log(todolist);
      addList.value = '';
      listShow();
    })

  }
  //显示在列表中
  function listShow() {
    let list = document.getElementsByClassName('todolist')[0];   
    list.innerHTML = '';
    todolist.forEach((ele, index) => {
      let li = document.createElement('li');
      let p = document.createElement('p');
      let em = document.createElement('em');
      p.innerHTML = '<span></span><i>' + ele.time + '</i>' + ele.task;
      let item = list.appendChild(li);
      item.appendChild(p);
      item.appendChild(em);
    });
  }
  //完成任务
  function getItem() {
    let list = document.getElementsByClassName('todolist')[0];
    addEvent(list, 'click', function (e) {
      //兼容性处理
      e = e || event;
      let target = e.target || ev.srcElement;
     
      if (target.nodeName === 'P') {
        target.style.textDecoration = 'line-through';
        target.childNodes[0].style.background = 'url(../images/success.png) no-repeat';
        target.childNodes[0].style.backgroundSize = '100%';
      }
      if (target.nodeName === 'EM') {
        //删除一条待办事项
        let liItem = target.parentNode;
        let index = Array.prototype.indexOf.call(liItem.parentNode.childNodes, liItem);
        todolist.splice(index, 1);
        listShow();
      }
    });
  }
  
  function getNowTime() {
    let foo = new Date();
    let now = foo.getMonth() + 1 + '月' + foo.getDate() + '日' + foo.getHours() + ':' + foo.getMinutes();
    return now;
  }

  function removeItem(index) {
    todolist.splice(index, 1);
    
  }
  additem();
  getItem()
})()

