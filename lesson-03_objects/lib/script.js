'use strict';

/*
  1 SetClassLinks
    Поставьте класс ссылкам
    важность: 3
    Сделайте желтыми внешние ссылки, добавив им класс external.
    Все ссылки без href, без протокола и начинающиеся с http://internal.com считаются внутренними.

  2 Object Tree
    Создайте дерево из объекта
    важность: 5
    Напишите функцию, которая создаёт вложенный список UL/LI (дерево) из объекта.

  3 Sliding tree
    Раскрывающееся дерево
    важность: 5
    Создайте дерево, которое по клику на заголовок скрывает-показывает детей

  4 CalendarTable
    Создать календарь в виде таблицы  
*/

/* 
* Author: Корнейко Александр
* Unit: mate lesson-objects
*/
let data = 
    {
      'Рыбы': {'Форель': {}, 'Щука': {} },
      'Деревья': { 
        'Хвойные': {'Лиственница': {}, 'Ель': {} },
        'Цветковые': { 'Берёза': {}, 'Тополь': {} }
      }
    };
let clickUlCounter = 0;

const hiddenClass = 'hidden';
const submitSelector = 'button[class=submit]';
const listHeader = 'slidingList';
const monthClass = 'month';

  
const submit = document.querySelectorAll(submitSelector);
  
//вешаем евент листенеры на кнопки проверки задач
for (let i = 0; i < submit.length; i++) {
  submit[i].addEventListener('click', checkSubmit);
  submit[i].innerHTML ='Go'; // просто попробовал
}
  
//запускаем проверку задачи в зависимости от нажатой кнопки
function checkSubmit(event) {
  let solutionDivElement = displaySolution(event.target.dataset.field);
  let dt;

  switch(event.target.dataset.field) {
  case 'yellow':
    toggleYellow(solutionDivElement);
    break;

  case 'tree':
    if (!clickUlCounter++) createTree(solutionDivElement, data);
    //clickUlCounter++; чтоб только один раз сработала функция
    listListeners();
    break; 

  case 'calendar':

    if (document.getElementById('dateInp').value) {
      dt = new Date(document.getElementById('dateInp').value);
    } else {
      dt = new Date();
    }

    solutionDivElement.innerHTML = '';
    createCalendar(solutionDivElement, dt.getFullYear(), dt.getMonth());
    break;  

  }
}
  
//для отображения дива с решением
function displaySolution(divIdValue) {
  const selector = document.querySelector('#'+divIdValue);
  selector.classList.toggle(hiddenClass);
  return selector;
}

// 1 задача
function toggleYellow(solutionDiv) {
  solutionDiv.querySelectorAll('a[href*="://"]:not([href^="http://internal.com"])').forEach(div => div.classList.toggle('external'));
}
  
// 2 задача
function createTree(container, obj) {
  container.appendChild(createListDom(obj));
}

function createListDom(obj) {
  if (isObjectKeyEmpty(obj)) return;

  let ul = document.createElement('ul');

  Object.keys(obj).forEach(key => {
    let li = document.createElement('li');
    li.innerHTML = `<span>${key}</span>`;
      
    let innerUl = createListDom(obj[key]);
    if (innerUl) {
      li.firstChild.classList.add(listHeader);
      li.appendChild(innerUl);
    }

    ul.appendChild(li);
  });

  return ul;
}

function isObjectKeyEmpty(obj) {
  if (Object.keys(obj).length > 0) return false;
  return true;
}

// 3 задача 
function listListeners() {
  const listH = document.querySelectorAll('.'+listHeader);
  for (let i = 0; i < listH.length; i++) {
    listH[i].addEventListener('click', slideList);
  }
}
 
function slideList(event) {
  event.target.nextElementSibling.classList.toggle(hiddenClass);
}

// 4 задача
function createCalendar(solutionDivElement, year, month) {
  let days = ['пн',	'вт',	'ср',	'чт',	'пт',	'сб',	'вс'];

  let today = new Date(year, month, 1);
  let monthBeginDay = today.getDay()-1;
  if (monthBeginDay === -1) monthBeginDay = 6;
  let monthLb = today.toLocaleDateString('uk-UA', {year: 'numeric', month: 'long'});
  // создать таблицу с заголовком телом и футером, добавить ей класс
  let table = document.createElement('table');
  table.classList.add(monthClass);
  let th = table.appendChild(document.createElement('thead'));
  let tb = table.appendChild(document.createElement('tbody'));
  let tf = table.appendChild(document.createElement('tfoot'));

  // заголовок - дни недели
  let tr = th.appendChild(document.createElement('tr'));
  for (let i = 0; i < 7; i++) {
    let th = document.createElement('th');
    th.innerHTML = days[i];
    tr.appendChild(th);
  }

  // для каждой недели крепим строку, а в ней перебираем все дни
  for (let i = 0; i < 6; i++) {
    tr = tb.appendChild(document.createElement('tr'));
    for (let j = 0; j < 7; j++) {
      let td = document.createElement('td');
      tr.appendChild(td);

      if (i === 0 && monthBeginDay > j || today.getMonth() !== month) {continue;}
      td.innerHTML = today.getDate();
      today.setDate(today.getDate() +1);
    }
    if (today.getMonth() !== month) {break;}

  }
  // футер с месяцем годом

  let td = tf.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
  td.colSpan = 7;
  td.innerHTML = monthLb;

  solutionDivElement.appendChild(table);
}
