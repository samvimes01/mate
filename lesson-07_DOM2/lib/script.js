'use strict';

const slider = document.querySelector('#slider-range');
//const range = document.querySelector('#range');
const leftHandle = document.querySelector('#left-handle');
const rightHandle = document.querySelector('#right-handle');

leftHandle.addEventListener('mousedown', drag);
rightHandle.addEventListener('mousedown', drag);

leftHandle.addEventListener('mouseover', highlight);
rightHandle.addEventListener('mouseover', highlight);

leftHandle.addEventListener('mouseout', deHighlight);
rightHandle.addEventListener('mouseout', deHighlight);

function highlight(event) {
  event.target.classList.add('highlight');
}
function deHighlight(event) {
  event.target.classList.remove('highlight');
}

leftHandle.ondragstart = function() {
  return false;
};

rightHandle.ondragstart = function() {
  return false;
};


function drag(event) {
  event.preventDefault(); // prevent selection start (browser action)

  const shiftX = event.clientX - event.target.getBoundingClientRect().left;
  // shiftY not needed, the thumb moves only horizontally

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

    // the pointer is out of slider => lock the thumb within the bounaries
    if (newLeft < 0) {
      newLeft = 0;
    }
    const rightEdge = slider.offsetWidth - event.target.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    event.target.style.left = newLeft + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

}


/*
leftHandle.addEventListener('dragstart', (event) => {
  event.preventDefault();
  console.log(event.clientX);

  leftHandle.style.left = event.clientX;
});


function drag(event) {
  let  handle = event.target;

  handle.addEventListener('mousemove', (event) => {
    event.preventDefault();
    console.log(event.clientX);

    handle.style.left = event.clientX;
  });
}
  */
