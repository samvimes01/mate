'use strict';
/*
* Author: Корнейко Александр
* Unit: mate lesson-DOM
*/
const ball = document.querySelector('#ball');
const field = document.querySelector('#field');

const largeImg = document.querySelector('#largeImg');
const ballToCenter = document.querySelector('#ballToCenter');
const thumbs = document.querySelector('#thumbs');

field.addEventListener('click', (event) => {

  const { top: fieldTop, left: fieldLeft } = field.getBoundingClientRect();

  const top = event.clientY - fieldTop - field.clientTop - ball.clientHeight / 2;

  const left = event.clientX - fieldLeft - field.clientLeft - ball.clientWidth / 2;

  ball.style.left = left + 'px';
  ball.style.top =  top + 'px';

  setTimeout(() => {
    if (left < 0) ball.style.left = 0 + 'px';

    if (top < 0) ball.style.top = 0 + 'px';

    if (left + ball.clientWidth > field.clientWidth) {
      ball.style.left = field.clientWidth - ball.clientWidth + 'px';
    }

    if (top + ball.clientHeight > field.clientHeight) {
      ball.style.top  = field.clientHeight - ball.clientHeight + 'px';
    }
  }, 400);

});


ballToCenter.addEventListener('click', () => {
  ball.style.left = field.clientWidth / 2 - ball.clientWidth / 2 + 'px';
  ball.style.top =  field.clientHeight / 2 - ball.clientHeight / 2 + 'px';
});


// галерея
thumbs.addEventListener('click', (event) => {
  event.preventDefault();
  let src, title;
  if (event.target.tagName === 'A') {
    src = event.target.href;
    title = event.target.title;
  }
  if (event.target.tagName === 'IMG') {
    src = event.target.parentElement.href;
    title = event.target.parentElement.title;
  }


  largeImg.src = src;
  largeImg.title = title;

});


// карусель
let frm = 0;
let to = 2;
const lis = document.querySelectorAll('li');

const btnLeft = document.querySelector('#toLeft');
const btnRight = document.querySelector('#toRight');
btnLeft.addEventListener('click', slide);
btnRight.addEventListener('click', slide);


shift(frm, to);

function slide(event) {
  if (event.target.id === 'toLeft' && frm > 0) {
    frm -= 1;
    to -= 1;
  }
  if (event.target.id === 'toRight' && to < lis.length - 1) {
    frm += 1;
    to += 1;
  }

  shift(frm, to);
}

function shift(frm, to) {
  for (let i = 0; i < lis.length; i++) {
    if (i > to || i < frm) {
      lis[i].classList.remove('visible');
    } else {
      lis[i].classList.add('visible');
    }
  }
}
