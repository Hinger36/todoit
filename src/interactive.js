import api from './api';

// const showList = show.showList;
const addEvent = api.addEvent;
let tags = {};

let ul = document.getElementsByClassName('project-list')[0];
let menu = document.getElementsByClassName('fixmenu')[0];
let tag = document.getElementsByClassName('tag')[9].children[0];
let nav = document.getElementsByClassName('nav-toggle')[0];
let lmenu = document.getElementsByClassName('left-menu')[0];
let box = document.getElementsByClassName('right-box')[0];
let filter = document.getElementsByClassName('filter');
let content = document.getElementsByClassName('content');
function listMenu() {
  console.log(show)
  let isHiden = true;
  let isShow = true;
  let timer = 0;
  addEvent(menu, 'click', function (event) {
    event.stopPropagation();
    if (isShow) {
      // ul.style.display = 'none';
      ul.style.top = '-180px';
      ul.style.transition = '0.6s';
      menu.children[0].children[0].style.transform = 'rotate(180deg)';
      menu.children[0].children[0].style.transition = '0.6s';    
    } else {
      ul.style.top = '';
      ul.style.transition = '0.6s';
      menu.children[0].children[0].style.transform = '';
      menu.children[0].children[0].style.transition = '0.6s';
    }
    isShow = !isShow;
  });
  addEvent(ul, 'click', function (event) {
    let target = event.target;
    if (target.nodeName === 'LI') {
      
      content[0].style.display = '';
      content[1].style.display = 'none';
      content[2].style.display = '';
      content[3].style.display = 'block';
      
      tag.innerHTML = target.innerText;
      tags.tag = tag.innerHTML; 
      // showList();
    }    
  });
  addEvent(nav, 'click', function () {
    if (isHiden) {
      lmenu.style.left = '0';
      lmenu.style.transition = '0.6s'
    } else {
      lmenu.style.left = '';
      lmenu.style.transition = '0.6s'
    }
    isHiden = !isHiden;
  });
  addEvent(box, 'click', function () {
    lmenu.style.left = '';
    lmenu.style.transition = '0.6s'
  });
  
  addEvent(filter[0], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = 'block';
    filter[0].style.backgroundColor = '#fff';
    content[1].style.display = 'none';
    content[2].style.display = '';
    content[3].style.display = '';
  });
  addEvent(filter[1], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = '';
    content[1].style.display = 'block';
    filter[1].style.backgroundColor = '#fff';
    content[2].style.display = '';
    content[3].style.display = '';
  });
  addEvent(filter[2], 'click', function () {
    for (let i = 0, len = filter.length; i < len; i++) {
      filter[i].style.backgroundColor = '#fafafa';
    }
    content[0].style.display = '';
    content[1].style.display = 'none';
    content[2].style.display = 'block';
    content[3].style.display = '';
    filter[2].style.backgroundColor = '#fff';
  });
}

export default {
  listMenu,
  tags
}
