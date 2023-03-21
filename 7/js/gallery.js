import { similarMiniatures } from './thumbnail.js';
import { showBigPicture } from './big_image.js';
import { renderThumbnails } from './thumbnail.js';

const container = document.querySelector('.pictures');


const renderGallery = () => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }
    const picture = similarMiniatures.find(
      (item) => item.id === Number(thumbnail.dataset.thumbnailId)
    );
    showBigPicture(picture);
  });
  renderThumbnails();
};


export {renderGallery};
