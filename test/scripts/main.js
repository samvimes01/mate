window.onload=function() {
  const submit = document.querySelector('#submit');
  const inputs = document.querySelectorAll('input.form-control, select, textarea');
  const gender = document.querySelectorAll('input[name=gender]');

  const validateForm = () => {
    let valid = false;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      valid = checkInput(input);
      if (!valid) return false;
    }
    // check gender radiobuttons
    valid = checkGender(gender);

    return valid;
  };

  const validateInput = (event) => {
    checkInput(event.target);
  };

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', validateInput);
  }

  submit.addEventListener('click', function(e) {
    e.preventDefault;
    if (validateForm()) alert('Validation passed.');// else alert('Not passed');
  });
};

/**
  * Checks validity of gender field.
  * @param {int} gender genders array.
  * @return {boolean} True if gender notempty.
  */
function checkGender(gender) {
  let valid = false;
  for (i = 0; i < gender.length; ++ i) {
    if (gender[i].checked) {
      valid = true;
      break;
    } else valid = false;
  }
  if (!valid) displayError(gender[0].parentElement.parentElement, errorMsg(gender[0], 'empty'));
  else hideError(gender[0].parentElement.parentElement);
  return valid;
}

/**
  * Checks validity of input field.
  * @param {int} input The first number.
  * @return {boolean} True if input notempty and valid.
  */
function checkInput(input) {
  let valid = false;
  if (input.value == '' && input.hasAttribute('required')) {
    displayError(input, errorMsg(input, 'empty'));
    valid = false;
  } else if (!checkValidity(input)) {
    valid = false;
  } else {
    hideError(input);
    valid = true;
  }
  return valid;
}

/**
  * Displays error span.
  * @param {int} input The first number.
  * @param {string} msg The first number.
  */
function displayError(input, msg) {
  if (msg == '') return;
  input.classList.add('invalid');
  input.nextElementSibling.classList.add('active');
  input.nextElementSibling.innerHTML = msg;
}

/**
  * Hides error span.
  * @param {int} input The first number.
  */
function hideError(input) {
  input.classList.remove('invalid');
  input.nextElementSibling.classList.remove('active');
  input.nextElementSibling.innerHTML = '';
}

/**
* Check if value have ' or " quotes.
* @param {int} input Input field.
* @return {boolean} True if value have qoutes, false if not.
*/
function checkQuotesTextValue(input) {
  if (/[\'\"]/.test(input.value)) {
    displayError(input, errorMsg(input, 'quotes'));
    return false;
  } else {
    return true;
  }
}

/**
  * Check validity of input's values based on dataset.validation.
  * @param {int} input Input field.
  * @return {boolean} True if value valid, false if not.
  */
function checkValidity(input) {
  switch (input.dataset.validation) {
    case 'text':
      return checkQuotesTextValue(input);
    case 'email':
      const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regMail.test(input.value)) {
        displayError(input, errorMsg(input, 'mail'));
        return false;
      } else {
        return true;
      }
    case 'password':
      if (!checkQuotesTextValue(input)) return false;
      if (/\w{8,}/.test(input.value)) {
        return true;
      } else {
        displayError(input, errorMsg(input, 'password'));
        return false;
      }
    case 'date':
      return true;

    default:
      // console.log(input.id + ' defval ' + input.dataset.validation);
      return true;
  }
}

/**
   * Combines error message based on input's id and error type.
  * @param {int} input The first number.
  * @param {int} err The second number.
  * @return {string} String with error message.
  */
function errorMsg(input, err) {
  const fieldNames = ['first_name', 'last_name', 'birthday', 'gender', 'country', 'email', 'password', 'address', 'notes'];
  const ind = fieldNames.indexOf(input.name);
  if ( ind >= 0 ) input = fieldNames[ind].charAt(0).toUpperCase() + fieldNames[ind].slice(1).replace('_', ' ');
  else input = input.name;
  switch (err) {
    case 'empty':
      err = input + ' is ' + 'required';
      break;
    case 'quotes':
      err = input + ' is ' + 'not valid because of qoutes';
      break;
    case 'mail':
      err = 'Email address is not valid ';
      break;
    case 'password':
      err = 'Password must be greater than 8 symbols';
      break;
    case 'notvalid':
      err = input + ' is ' + 'not valid';
      break;
    default:
      err = '';
      break;
  }
  return err;
}

