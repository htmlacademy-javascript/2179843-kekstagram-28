import { randomizeElements } from './utils.js';
import {renderGallery} from './gallery.js';

const PICTURES_COUNT = 10;
const filtersElement = document.querySelector('.img-filters');
const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const discussedButtonElement = document.querySelector('#filter-discussed');

const compareComments = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;
  return rankB - rankA;
};

const createDefaultFilter = (pictures) => pictures.slice();

const createRandomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return randomizeElements(picturesArray).slice(0, PICTURES_COUNT);
};

const createDiscussedFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return picturesArray.sort(compareComments);
};

const removeActiveClass = () => {
  const activeButtonElement = document.querySelector('.img-filters__button--active');
  activeButtonElement.classList.remove('img-filters__button--active');
};

const clearPicturesContainer = () => {
  const picturesAll = document.querySelectorAll('.picture');
  picturesAll.forEach((pictureElement) => {
    pictureElement.remove();
  });
};

const renderPicturesFilter = (pictures) => {
  clearPicturesContainer();
  renderGallery(pictures);
};

const getFilteredPictures = (pictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  let timeoutId = null;
  let lastFilter = null;

  const applyLastFilter = () => {
    if (lastFilter) {
      renderPicturesFilter(lastFilter(pictures));
    }
    lastFilter = null;
    timeoutId = null;
  };

  defaultButtonElement.addEventListener('click', (evt) => {
    removeActiveClass();
    if (evt.target === defaultButtonElement) {
      defaultButtonElement.classList.add('img-filters__button--active');
    }
    lastFilter = createDefaultFilter;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(applyLastFilter, 500);
  });

  randomButtonElement.addEventListener('click', (evt) => {
    removeActiveClass();
    if (evt.target === randomButtonElement) {
      randomButtonElement.classList.add('img-filters__button--active');
    }
    lastFilter = createRandomFilter;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(applyLastFilter, 500);
  });

  discussedButtonElement.addEventListener('click', (evt) => {
    removeActiveClass();
    if (evt.target === discussedButtonElement) {
      discussedButtonElement.classList.add('img-filters__button--active');
    }
    lastFilter = createDiscussedFilter;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(applyLastFilter, 500);
  });
};

export {getFilteredPictures};
