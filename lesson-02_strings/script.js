/* eslint-disable no-console */
'use strict';

/**
 * 1:
 * Напишите функцию, которая будет считать количество вхождений буквы в строку 
 * (без учета регистра)
 * 
 * 2:
 * Реализовать RLE-сжатие: 
 * Функция принимает строку и возвращает новую строку 
 * 2 и больше одинаковых букв стоящих подряд в исходной строке
 * заменяются на эту букву и число повторений
 * число 1 не добавляется!
 * 
 * AAAB -> A3B, BCCDDDAXXXX -> BC2D3AX4
*/

/* 
* Author: Корнейко Александр
* Unit: mate lesson-02_strings
*/
window.onload = function(){
  
    const submit = document.querySelectorAll('button[class=submit]');
  
    //запускаем проверку задачи в зависимости от нажатой кнопки
    const checkTest = (event) => {
        switch(event.target.dataset.field) {
        case 'submitTest1':
            var str = prompt('Строка для проверки', 'Quick brown fox jumped Over the lazy dog.');
            var letterToCount = prompt('Буква для подсчета', 'o');
            alert('В строке <' + str + '> кол-во букв <' + letterToCount + '>: ' + countLetters(str, letterToCount));
            break;
        case 'submitTest2':
            alert('RLE: ' + rle(prompt('Строка для проверки RLE', 'AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD')));
            break;
        }
    };
  
    //вешаем евент листенеры на кнопки проверки задач
    for (let i = 0; i < submit.length; i++) {
        submit[i].addEventListener('click', checkTest);
    }
  
    //функция для подсчета кол-ва вхождений буквы в строку
    function countLetters(str, letterToCount) {
        var re = RegExp(letterToCount, 'gi');
        return str.match(re).length;
    }
  
    //функция RLE сжатия
    function rle(source) {
    //кждую букву юудем сравнивать с предыдущея, 1я буква строки = предыдщуя
        let previousLetter = source[0];
        let result = previousLetter;
        let counter = 1;
        let length = source.length;
        /*каждую букву строки начиная со второй сравниваем с предыдущей, если равны - увеличиваем счетчик,
      пока
    */
        for(let i = 1; i <= length; i++) {
            let currentLetter = source[i];
            if (currentLetter == previousLetter) {
                counter++; 
                previousLetter = currentLetter; 
                continue;
            }
            if (counter > 1) {
                result += counter; 
                counter = 1;
            }
            previousLetter = currentLetter;
            result += currentLetter !== undefined ? currentLetter : ''; 
        }
        return result;
    }
  
    let convertedString = rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD');
    let expectedString = 'AV3B3V2XDHJF4D6HA4J3D2SLS3D4';
    console.assert(
        convertedString === expectedString,
        `${convertedString} is not equal to expected ${expectedString}`
    );
    
    
};