import { similarNewMiniatures, newMiniaturesFragment, createThumbnail } from './thumbnail.js';

const renderGallery = (pictures) => {
  pictures.forEach((picture) => {
    createThumbnail(picture);
  });
  return similarNewMiniatures.appendChild(newMiniaturesFragment);
};

export { renderGallery };
