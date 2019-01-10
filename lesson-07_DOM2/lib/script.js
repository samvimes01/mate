'use strict';

const slider = document.querySelector('#slider-range');
const range = document.querySelector('#range');
const leftHandle = document.querySelector('#left-handle');
const rightHandle = document.querySelector('#right-handle');

//slider.addEventListener('mousedown', drag);
leftHandle.addEventListener('dragstart', (event) => {
  event.preventDefault();
  console.log(event.clientX);

  leftHandle.style.left = event.clientX;
});


function drag(event) {
  console.log(event.target === leftHandle);
  let handle;
  if (event.target === leftHandle || event.target === rightHandle) {
    handle = event.target;
  } else return;

  handle.addEventListener('mousemove', (event) => {
    event.preventDefault();
    console.log(event.clientX);

    handle.style.left = event.clientX;
  });


}

