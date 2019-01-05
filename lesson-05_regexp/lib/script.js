/* 
* Author: Корнейко Александр
* Unit: mate lesson-regexp
*/

/*
Task 1
Время имеет формат часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00. Напишите регулярное выражение для поиска времени в строке: «Завтрак в 09:00». Учтите, что «37:98» — некорректное время.
*/
let re = new RegExp('([0][0-9]|[1][0-9]|[2][0-3]):([0-5][0-9])');
let testArr = ['Завтрак в 09:00', 'Сон в 23:16 text ', 'text at 24:12', 'some 12:62'];
let test = testArr[1];
console.log( test.match(re)[0] );
//testArr.forEach( el => console.log(el.match(re)[0]));

/*
Task 2
Арифметическое выражение состоит из двух чисел и операции между ними, например: 1 + 2, 1.2 * 3.4, -3 / -6, -2 - 2. Список операций: +, -, *, /. Также могут присутствовать пробелы вокруг оператора и чисел. Напишите регулярное выражение, которое найдёт как всё арифметическое действие, так и (через группы) два операнда.
*/
testArr = ['1 + 2', '1.2 * 3.4', '-3 / -6', '-2 - 2'];
test = testArr[2];

let firstOperand = test.match(/^\s*(-|)(\d+\.\d+|\d+)\s*/)[0].trim();
let secondOperand = test.match(/\s*(-|)(\d+\.\d+|\d+)\s*$/)[0].trim();
let operator = test.match(/\s+(\+|-|\*|\/)\s+/)[0].trim();

console.log(`${firstOperand} ${operator} ${secondOperand}`);


/*
Task 3
Создать функцию createURL(templateURL, params), которая на основе шаблона и параметров формирует URL
*/
  let url = createURL(
    `/api/countries/{country}/regions/{region}/`,
    { country: `Ukraine`, region: `Kiev` }
  );

  /*
  console.assert(
    url === '/api/countries/Ukraine/regions/Kiev/'
  );
*/
  
function createURL(template, params) {
  let result = template;
  let templs = template.match(/{\w+}/g);
  templs.forEach(el => {
    let word = el.substr(1, el.length - 2);
    let prop = params[word];
    result = result.replace(/{\w+}/, prop);
  });
  
  console.log(templs, result);
}