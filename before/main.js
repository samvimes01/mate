/* 
* Author: Корнейко Александр
* Unit: mate lesson-01_basics-numbers/before
*/
window.onload = function(){
  const submit = document.querySelectorAll('button[class=submit]');
  const tests = document.querySelectorAll('.case');

//отображаем или скрываем блок с задачей
  const displaySol = (event) =>  {
    const selector = document.querySelector(('#'+event.target.dataset.field));
    selector.classList.toggle('hidden')
  }

//запускаем проверку задачи в зависимости от нажатой кнопки
  const checkTest = (event) => {
    switch(event.target.dataset.field) {
      case 'submitTest1':
        bigger100();
        break;
      case 'submitTest2':
        primeNumber();
        break;
      case 'submitTest3':
        fizzbuzz();
        break;
    }
  };

//вешаем евент листенеры на кнопки отображения задач и проверки задач
  for (let i = 0; i < tests.length; i++) {
    tests[i].addEventListener('click', displaySol);
  }

  for (let i = 0; i < submit.length; i++) {
    submit[i].addEventListener('click', checkTest);
  }
  
  
  function bigger100(){
    let number = prompt('Введите число больше 100');
    if (number != null && number <= 100) {
      bigger100();
    }
  }
  
  
  function primeNumber() {
    const answers = document.querySelector('#answers');
    
    answers.innerHTML = '';
    let result = '<p>Для n= ';
    let numbers = prompt('До какого числа вычислять простые числа?', 10);
    result += (numbers + ' => ');
    
    if (numbers < 2) {
      alert('Только числа больше 1');
    } else if (numbers > 1000) {
      alert('В учебных целях ограничимся только числами до 1000');
    } else {    
      /*
      циклом перебираем все числа от 2 до n, каждое делим в цикле на все меньшие числа, 
      если есть делится без остатка идем к следующему числу до n,
      если нет - то добавляем к результату
      */
      let i = 1;
      nbs:
      while(i++ < numbers) {
        let j = i;
        while(j-- > 2) {
          let r = i % j;
          if (r == 0) continue nbs;
        }
        result += (i + ', ');
      }
      
      result += '</p>';
      answers.innerHTML = result;
    }
  }

  function fizzbuzz() {
    let i = 0;
    while(i++ < 100) {
      if ( i % 5 == 0 && i % 5 == 0 ) {
        console.log('FizzBuzz');
      } else if ( i % 3 == 0 ) {
        console.log('Fizz');
      } else if ( i % 5 == 0) {
        console.log('Buzz');
      } else {
        console.log(i);
      }
    }
  }

}