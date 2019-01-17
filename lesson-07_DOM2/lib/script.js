'use strict';

const slider = document.querySelector('#slider-range');
const range = document.querySelector('#range');
const leftHandle = document.querySelector('#left-handle');
const rightHandle = document.querySelector('#right-handle');
const min = document.querySelector('#min');
const max = document.querySelector('#max');

manageRange();

slider.addEventListener('click', rangeClick);

min.addEventListener('input', setInputToRange);
max.addEventListener('input', setInputToRange);

leftHandle.addEventListener('mouseover', highlight);
rightHandle.addEventListener('mouseover', highlight);

leftHandle.addEventListener('mouseout', deHighlight);
rightHandle.addEventListener('mouseout', deHighlight);

slider.addEventListener('mousedown', handleMousedown);

function handleMousedown(event) {
  // on mousedown add listeners
  let handle = leftHandle;
  if (event.target === rightHandle) {
    handle = rightHandle;
  } else if (event.target === leftHandle) {
    handle = leftHandle;
  } else return;


  document.addEventListener('mouseup', handleMouseup);
  document.addEventListener('mousemove', handleMousemove);


  function handleMousemove(event) {

    const shiftX = event.clientX - slider.clientLeft - slider.getBoundingClientRect().left - handle.offsetWidth / 2;

    let newLeft = shiftX;

    // the pointer is out of slider => lock the handle within the bounaries
    if (shiftX < 0) {
      newLeft = 0;
    }
    const rightEdge = slider.clientWidth - handle.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    handle.style.left = newLeft + 'px';
    handle.children[0].textContent = tooltip(handle);
    manageRange();
  }

  function handleMouseup() {
    // on mouseup remove listeners
    document.removeEventListener('mouseup', handleMouseup);
    document.removeEventListener('mousemove', handleMousemove);
  }

}

leftHandle.ondragstart = function() {
  return false;
};

rightHandle.ondragstart = function() {
  return false;
};

function highlight(event) {
  event.target.classList.add('highlight');
  event.target.children[0].textContent = tooltip(event.target);
}
function deHighlight(event) {
  event.target.children[0].textContent = '';
  event.target.classList.remove('highlight');
}

function manageRange() {
  let { left } = leftHandle.getBoundingClientRect();
  if (rightHandle.getBoundingClientRect().left < leftHandle.getBoundingClientRect().left) {
    left = rightHandle.getBoundingClientRect().left;
  }
  range.style.left = left - slider.clientLeft - slider.getBoundingClientRect().left + 'px';
  range.style.width = Math.abs(leftHandle.getBoundingClientRect().left - rightHandle.getBoundingClientRect().left) + 'px';

  setRangeToInput();
}

function setRangeToInput() {
  const minVal = parseInt(range.style.left) / (slider.clientWidth - leftHandle.offsetWidth) * 100;
  const maxVal = (parseInt(range.style.width) + parseInt(range.style.left)) / (slider.clientWidth - leftHandle.offsetWidth) * 100;
  min.value = minVal > 0 ? Math.round(minVal) : 0;
  max.value = maxVal > 100 ? 100 : Math.round(maxVal);
}

function setInputToRange() {
  let a = min.value;
  let b = max.value;
  if (a < 0) {
    a = 0;
  }
  if (b < 0) {
    b = 0;
  }
  if (a > 100) {
    a = 100;
  }
  if (b > 100) {
    b = 100;
  }
  const minimum = Math.min(a, b);
  const maximum = Math.max(a, b);
  const sliderCountable = slider.clientWidth - leftHandle.offsetWidth;
  const left = (minimum * sliderCountable) / 100;
  const right = (maximum * sliderCountable) / 100;
  leftHandle.style.left = Math.round(left) + 'px';
  rightHandle.style.left = Math.round(right) + 'px';

  manageRange();
}


function tooltip(handle) {
  if (handle.getBoundingClientRect().left < range.getBoundingClientRect().left) return min.value;
  return max.value;
}

function rangeClick(event) {

  let clickX = event.clientX - slider.clientLeft - slider.getBoundingClientRect().left - leftHandle.offsetWidth / 2;

  let distanceL = Math.abs(clickX - leftHandle.getBoundingClientRect().left);
  let distanceR = Math.abs(clickX - rightHandle.getBoundingClientRect().left);

  if (distanceL < distanceR) {
    leftHandle.style.left =  clickX + 'px';
  } else {
    rightHandle.style.left =  clickX + 'px';
  }
  manageRange();

}
