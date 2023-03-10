import {similarPhotos} from './data.js';

const similarNewMiniatures = document.querySelector('.pictures');
const similarMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarMiniatures = similarPhotos;

const NewMiniaturesFragment = document.createDocumentFragment();

similarMiniatures.forEach(({url, like, comment}) => {
  const MiniatureElement = similarMiniaturesTemplate.cloneNode(true);
  MiniatureElement.querySelector('.picture__img').src = url;
  MiniatureElement.querySelector('.picture__comments').textContent = comment.length;
  MiniatureElement.querySelector('.picture__likes').textContent = like;
  NewMiniaturesFragment.append(MiniatureElement);
});

similarNewMiniatures.append(NewMiniaturesFragment);

export {similarNewMiniatures};
