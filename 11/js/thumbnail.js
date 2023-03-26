import { showBigPicture } from './big_image.js';

const similarNewMiniatures = document.querySelector('.pictures');
const similarMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newMiniaturesFragment = document.createDocumentFragment();

const createThumbnail = (picture) => {
  const thumbnail = similarMiniaturesTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').textContent = picture.description;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  thumbnail.addEventListener('click', () => {
    showBigPicture(picture);
  });
  newMiniaturesFragment.appendChild(thumbnail);
};

export { similarNewMiniatures, newMiniaturesFragment, createThumbnail };
