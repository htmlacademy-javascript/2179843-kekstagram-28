import { debounce, randomizeElements } from './utils.js';
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
  defaultButtonElement.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === defaultButtonElement) {
      defaultButtonElement.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDefaultFilter(pictures));
  }));
  randomButtonElement.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === randomButtonElement) {
      randomButtonElement.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createRandomFilter(pictures));
  }));
  discussedButtonElement.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === discussedButtonElement) {
      discussedButtonElement.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDiscussedFilter(pictures));
  }));
};

export {getFilteredPictures};
