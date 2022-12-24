import threttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputEmailRef = formRef.querySelector('[name= "email"]');
const inputMessageRef = formRef.querySelector('[name= "message"]');

// const obj = new Map();
const formData = {};
const STORAGE_KEY = 'feedback-form-state';

insetForm();

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', threttle(onInput, 500));

function onInput(evt) {
  const name = evt.target.name;
  const value = evt.target.value;

  formData[name] = value;

  const savedForm = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, savedForm);
  console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

function insetForm() {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedForm) {
    const { email = '', message = '' } = savedForm;
    inputEmailRef.value = email;
    inputMessageRef.value = message;
  }
}
