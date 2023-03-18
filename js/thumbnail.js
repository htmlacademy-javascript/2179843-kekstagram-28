import {similarPhotos} from './data.js';

const similarNewMiniatures = document.querySelector('.pictures');
const similarMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarMiniatures = similarPhotos;

const newMiniaturesFragment = document.createDocumentFragment();

similarMiniatures.forEach(({url, like, comment}) => {
  const miniatureElement = similarMiniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__comments').textContent = comment.length;
  miniatureElement.querySelector('.picture__likes').textContent = like;
  newMiniaturesFragment.append(miniatureElement);
  miniatureElement.dataset.miniatureElementId = url;
});

similarNewMiniatures.append(newMiniaturesFragment);

export {similarNewMiniatures};
