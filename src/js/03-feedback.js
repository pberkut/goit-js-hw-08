import threttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputEmailRef = formRef.querySelector('[name= "email"]');
const inputMessageRef = formRef.querySelector('[name= "message"]');

const obj = new Map();
const LOCALSTORAGE_KEY = 'feedback-form-state';

const savedMessage = { ...JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) };
const { email = '', message = '' } = savedMessage;

inputEmailRef.value = email;
inputMessageRef.value = message;

formRef.addEventListener('submit', onSubmit);
formRef.addEventListener('input', threttle(onInput, 500));

function onInput(evt) {
  const name = evt.target.name;
  const value = evt.target.value;

  const message = Object.fromEntries(obj.set(name, value));

  const savedMessage = JSON.stringify(message);

  localStorage.setItem(LOCALSTORAGE_KEY, savedMessage);
  console.log(savedMessage);
}

function onSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formRef.reset();
}
