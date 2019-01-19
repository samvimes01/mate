'use strict';
const input = document.querySelector('#input');
const tooltipHandler = document.querySelector('.tooltipHandler');
const tooltip = document.querySelector('.tooltip');

const wrapper = throttle(updateTooltip, 500);

document.addEventListener('mousemove', getTooltip);
document.addEventListener('mousemove', wrapper);


function getTooltip(event) {

  tooltipHandler.style.position = 'absolute';

  let top = event.clientY - tooltip.clientHeight - 5; // - высота стрелочки

  let left = event.clientX  - tooltip.offsetWidth / 2;

  if (left < 0) left = 0;
  if (top < 0) top = 0;

  tooltipHandler.style.left = left + 'px';
  tooltipHandler.style.top =  top + 'px';
}

function updateTooltip(event) {
  if (!event) return; // иногда консоль ругается шо нет евента - пока не понял чего
  input.value = `x: ${event.clientX}, y: ${event.clientY}`; //контроль
  tooltip.textContent = `x: ${event.clientX}, y: ${event.clientY}`;
  tooltip.style.visibility = 'visible';

}

function throttle(f, delay) {
  let last, deferTimer;
  return function() {
    const now = new Date().getTime();
    if (now - last < delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        f.apply(this, arguments);
      }, delay);
    } else {
      last = now;
      f.apply(this, arguments);
    }
  };
}
