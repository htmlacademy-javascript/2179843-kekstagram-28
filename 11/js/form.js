import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {sendData} from './api.js';

const MAX_TAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');

const isHashtagUnique = (string) => {
  const hashtags = getHashtags(string);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const isValidQuantity = (string) => getHashtags(string).length <= MAX_TAGS_COUNT;

const getTagsToLowerCase = (string) => {
  const tags = getHashtags(string);
  return tags.map((element) => element.toLowerCase());
};

const isValidSymbol = (string) => {
  const tags = getHashtags(string);
  return tags.every((element) => VALID_SYMBOLS.test(element));
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  successTextClass: 'text-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

pristine.addValidator(hashtagField, getTagsToLowerCase, '');
pristine.addValidator(hashtagField, isHashtagUnique, 'Повтор хэштега');
pristine.addValidator(hashtagField, isValidQuantity, 'максимальное значение 5 хэштегов');
pristine.addValidator(hashtagField, isValidSymbol, 'Хэштег содержит запрещенные символы');

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isFocusOnTextField = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isFocusOnTextField()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
          hideModal();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
          hideModal();
        },
        new FormData(evt.target),
      );
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

export { body, showModal, hideModal, onFormSubmit };
