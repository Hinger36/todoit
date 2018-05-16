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
    
    addEvent(btn, 'click', function () {
      if (!addList.value) {
        return;
      }
      todolist.push(addList.value);
      console.log(todolist);
      addList.value = '';
      listShow();
    })

  }
  function listShow() {
    let li = document.createElement('li');
    let p = document.createElement('p');
    let list = document.getElementsByClassName('todolist')[0];
    todolist.forEach(ele => {
      p.innerHTML = '<span></span>' + ele;
      list.appendChild(li).appendChild(p)
    });
  }
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
        console.dir(target.childNodes[0]);
      }
    })
  }
  additem();
  getItem()
})()

