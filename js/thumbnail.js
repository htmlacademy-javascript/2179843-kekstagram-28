import {similarPhotos} from './data.js';

const similarNewMiniatures = document.querySelector('.pictures');
const similarMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarMiniatures = similarPhotos;
const newMiniaturesFragment = document.createDocumentFragment();

similarMiniatures.forEach(({url, likes, description, comments, id}) => {
  const thumbnail = similarMiniaturesTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').textContent = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  newMiniaturesFragment.appendChild(thumbnail);

  return thumbnail;
});

const renderThumbnails = () => {
  similarNewMiniatures.appendChild(newMiniaturesFragment);
};

export {similarNewMiniatures, similarMiniatures, renderThumbnails};
