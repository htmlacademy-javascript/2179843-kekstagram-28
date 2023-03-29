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
  const handleDocumentClick = (evt) => {
    if (!sectionSuccess.contains(evt.target)) {
      sectionSuccess.remove();
      document.removeEventListener('click', handleDocumentClick);
    }
  };
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      sectionSuccess.remove();
    }
  });
  sectionSuccess.addEventListener('click', (evt) => {
    if (evt.target === sectionSuccess || evt.target === buttonSuccess) {
      sectionSuccess.remove();
    }
  });
  successInner.addEventListener('click', (evt) => {
    if (evt.target === !buttonSuccess && evt.target === successInner) {
      evt.stopPropagation();
    }
  });
  document.addEventListener('click', handleDocumentClick);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  body.appendChild(errorFragment);
  const buttonError = document.querySelector('.error__button');
  const sectionError = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  const handleDocumentClick = (evt) => {
    if (!sectionError.contains(evt.target)) {
      sectionError.remove();
      document.removeEventListener('click', handleDocumentClick);
    }
  };
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      sectionError.remove();
    }
  });
  sectionError.addEventListener('click', (evt) => {
    if (evt.target === sectionError || evt.target === buttonError) {
      sectionError.remove();
    }
  });
  errorInner.addEventListener('click', (evt) => {
    if (evt.target === !buttonError && evt.target === errorInner) {
      evt.stopPropagation();
    }
  });
  document.addEventListener('click', handleDocumentClick);
};

export{ showErrorMessage, showSuccessMessage };
