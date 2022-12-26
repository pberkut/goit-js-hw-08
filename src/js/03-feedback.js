import threttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

insetForm();

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', threttle(onInput, 500));

function onInput(e) {
  let savedForm = localStorage.getItem(STORAGE_KEY);
  savedForm = savedForm ? JSON.parse(savedForm) : {};
  savedForm[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedForm));
}

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function insetForm() {
  let savedForm = localStorage.getItem(STORAGE_KEY);

  if (savedForm) {
    savedForm = JSON.parse(savedForm);
    Object.entries(savedForm).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}
