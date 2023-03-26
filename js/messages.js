import {isEscapeKey} from './utils.js';
import {body} from './form.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  body.appendChild(successFragment);
  const buttonSuccess = document.querySelector('.success__button');
  const sectionSuccess = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      sectionSuccess.remove();
    }
  });
  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target === buttonSuccess) {
      sectionSuccess.remove();
    }
  });
  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target === successInner) {
      sectionSuccess.remove();
    }
  });
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  body.appendChild(errorFragment);
  const buttonError = document.querySelector('.error__button');
  const sectionError = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      sectionError.remove();
    }
  });
  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target === buttonError) {
      sectionError.remove();
    }
  });
  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target === errorInner) {
      sectionError.remove();
    }
  });
};

export{ showErrorMessage, showSuccessMessage };
