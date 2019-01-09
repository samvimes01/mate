/* 
* Author: Корнейко Александр
* Unit: mate lesson-arrays
*/


// Добавить класс в строку
let obj = {
  className: ' open menu     open  '
};


function addClass(obj, classToAdd) {
  let words = obj.className.split(' ');
  let wordsSet = new Set(words);
  wordsSet.delete('');
  wordsSet.add(classToAdd);
  let isExist = words.includes(classToAdd);
  
  if (isExist) {
    return;
  }

  obj.className = Array.from(wordsSet).join(' ');
}

/*function removeClass(obj, classToAdd) {
  let words = obj.className.split(' ');
  let wordsSet = new Set(words);
  wordsSet.delete(classToAdd);
}*/

addClass(obj, 'new'); // obj.className='open menu new'
addClass(obj, 'open'); // без изменений (класс уже существует)
addClass(obj, 'me'); // obj.className='open menu new me'
//console.log(obj);

// Палиндром 
const btnPal = document.getElementById('palindrome');
btnPal.addEventListener('click', checkPal);

function palindrome(str) {
  let arr = Array.from(str).filter(el => el.match(/[\wА-Яа-я]/)).map(el => el.toLowerCase());
  let len = arr.length;

  if (len < 2) return true;

  for (let i = 0; i < len / 2; i++) {
    if (arr[i] !== arr[len - 1 - i]) return false;
  }
  return true;
}

function checkPal() {
  const pal = document.getElementById('strPal').value;
  alert(palindrome(pal));
}

let s = 'A man, a plan, a canal: Panama';
//console.log(palindrome(s));


// Написать код методов map, filter, find, every, some, .reduce .sort(fn)
let array = [];
let users = [10, 20, 30, 40];
users.__proto__ = array;

array.__proto__.forEach2 = function(callback) {
  for (let index = 0; index < this.length; index++) {
    let item = this[index];
    callback(item, index, this);
  }
};
//users.forEach(console.log);
//users.forEach2(console.log);

array.__proto__.map2 = function(callback) {
  let result = [...this];
  for (let index = 0; index < result.length; index++) {
    let item = result[index];
    callback(item, index, result);
  }
  return result;
};
//users.map(console.log);
//users.map2(console.log);


array.__proto__.filter2 = function(callback) {
  let result = [];
  for (let index = 0; index < this.length; index++) {
    let item = this[index];
    if (callback(item, index, this)) result.push(item);
  }
  return result;
};
//console.log(users.filter(x => x > 20));
//console.log(users.filter2(x => x > 20));


array.__proto__.find2 = function(callback) {
  let result = undefined;
  for (let index = 0; index < this.length; index++) {
    let item = this[index];
    if (callback(item, index, this)) {
      result = item;
      break;
    }
  }
  return result;
};
//console.log(users.find(x => x > 20));
//console.log(users.find2(x => x > 20));


array.__proto__.every2 = function(callback) {
  let result = true;
  for (let index = 0; index < this.length; index++) {
    let item = this[index];
    if (!callback(item, index, this)) {
      result = false;
      break;
    }
  }
  return result;
};
//console.log(users.every(x => x < 60));
//console.log(users.every2(x => x < 20));

array.__proto__.some2 = function(callback) {
  let result = false;
  for (let index = 0; index < this.length; index++) {
    let item = this[index];
    if (callback(item, index, this)) {
      result = true;
      break;
    }
  }
  return result;
};
//console.log(users.some(x => x < 20));
//console.log(users.some2(x => x < 20));


array.__proto__.reduce2 = function(callback, initValue) {
  let result = initValue ? initValue : this[0];
  let index = initValue ? 0 : 1;
  for (; index < this.length; index++) {
    let item = this[index];
    result = callback(result, item, index, this);
  }
  return result;
};
//console.log(users.reduce((sum, x) => sum + x, 2));
//console.log(users.reduce2((sum, x) => sum + x, 2));

// good job Al, take a pie from the shelf :-)
array.__proto__.sort2 = function(callback) {
  let length = this.length; 
  for (let i = 0; i < length-1; i++) {
    for (let j = 0; j < length-i-1; j++) {
      if (callback(this[j] , this[j+1]) > 0) 
      {
        let temp = this[j]; 
        this[j] = this[j+1]; 
        this[j+1] = temp; 
      } 
    }
  }
  return this;
};
users = [1,2,3,4,5];
//console.log(users.sort((a, b) => b - a));
console.log(users.sort2((a, b) => b - a ));