'use strict';
/**
 * Author: Oleksandr Korneiko
 * Unit: Autocomplete
 **/

const parentSelector = '.material-select';
const parent = document.querySelector(`${parentSelector}`);
const input = parent.querySelector(`${parentSelector}__input`);
const selectedElems = parent.querySelector(`${parentSelector}__selected-items`);
const label = parent.querySelector(`${parentSelector}__label`);
const send = parent.querySelector(`${parentSelector}__btn-send`);
const suggestionElems = parent.querySelector(`${parentSelector}__autocomplete-suggestions`);


const availableTags = [
  'ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'Clojure',
  'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'Java',
  'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'
];

let selected = new Set();

const wrapper = debounce(onChange, 1000);

input.addEventListener('input', wrapper);
input.addEventListener('keyup', addInput); // hit Enter on input value that isn't in the suggestions list - adds this value
input.addEventListener('focus', moveLabel); // just visual effects
input.addEventListener('blur', moveLabel);
document.addEventListener('click', moveLabel);
selectedElems.addEventListener('click', delChip); // delete chip item (selected value)
suggestionElems.addEventListener('click', selectItem);
suggestionElems.addEventListener('mouseleave', hideSuggestions);
suggestionElems.addEventListener('keyup', selectItemByKey);
send.addEventListener('click', sendSelected);

// this function debounced. after delay it shows list with suggeste items
function onChange(event) {
  const value = event.target.value;
  if (!value) return;
  const suggestions = getSuggestions(value);
  if (!suggestions) return;

  for (const item of suggestions) {
    const suggestion = `          <li tabindex = "1" class = "material-select__autocomplete-suggestion">
                ${item}
              </li>`;
    suggestionElems.insertAdjacentHTML('beforeEnd', suggestion);
  }
  suggestionElems.classList.remove('hidden');
  suggestionElems.firstElementChild.focus();
}

// hit Enter to add input.value to Chips (selected items)
function addInput(event) {
  if (event.keyCode === 13) {
    addItem(event.target.value);
  }
}

// delete Chip
function delChip(event) {
  event.isHandled = true;
  if (!event.target.classList.contains('mat-chip__close-btn')) return;
  const chip = event.target.closest('.mat-chip');
  // may be not the clearest realisation - last letter of Chips - always X - it's instead of close btn, so we slice this letter
  selected.delete(chip.textContent.slice(0, -1));
  chip.remove();
}

function hideSuggestions(event) {
  if (event.isHandled) return;
  clearDom(suggestionElems);
  suggestionElems.classList.add('hidden');
  input.value = '';
  window.focus();
  moveLabel();
}

// select item from suggestions list after click
function selectItem(event) {
  event.isHandled = true;
  if (!event.target.closest('.material-select__autocomplete-suggestion')) return;
  addItem(event.target.textContent);
}

// select item from suggestions list after arrow Up/Down, and Enter
function selectItemByKey(event) {
  const parent = event.target.parentElement;
  if ((event.keyCode === 38 && event.target === parent.firstElementChild) ||
      (event.keyCode === 40 && event.target === parent.lastElementChild)) {
    return;
  }
  if (event.keyCode === 38) {
    event.target.previousElementSibling.focus();
  }
  if (event.keyCode === 40) {
    event.target.nextElementSibling.focus();
  }
  if (event.keyCode === 13) {
    addItem(event.target.textContent);
  }
}

// useless function to pretend that we send selected Chips to server or elsewhere
function sendSelected(event) {
  hideSuggestions(event);
  clearDom(selectedElems);
  event.isHandled = true;
  if (selected.size === 0) return;
  const val = Array.from(selected).join(', ');
  selected = new Set();
  const sol = document.querySelector('#solution');
  sol.insertAdjacentHTML('beforeEnd', `<div id="result">Result: ${val}</div>`);
  setTimeout(() => sol.lastElementChild.remove(), 4000);
  moveLabel();
}

// instead of data from array - this function may get data from server
function getSuggestions(value) {
  const result = availableTags.filter(el => el.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
  if (result.length === 0) return false;
  return result;
}

// utility function to clear suggestions list
function clearDom(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// just for visual effects - moves label from input field
function moveLabel() {
  if (input ===  document.activeElement || (selected.size !== 0 || input.value !== '')) {
    label.style.position = 'static';
    label.style.fontSize = '13px';
  } else {
    label.style.position = 'absolute';
    label.style.fontSize = '15px';

  }
}

// adds selected item to set and chips span
function addItem(value) {
  if (selected.has(value)) return;
  selected.add(value);
  const suggestion = `<span class="material-select__selected-item mat-chip">${value}<span class="mat-chip__close-btn">X</span></span>`;
  selectedElems.insertAdjacentHTML('beforeEnd', suggestion);
}

// this function copypasted from previous task, which Misha marked as Done
function debounce(f, delay) {
  let timerId;
  return function() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      f.call(this, ...arguments);
      timerId = null;
    }, delay);
  };
}
