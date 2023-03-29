
import { getData, sendData } from './api.js';
import { renderGallery } from './gallery.js';
import { showAlert } from './utils.js';
import { getFilteredPictures } from './filters.js';
import { hideModal, setOnFormSubmit } from './form.js';

try {
  const data = await getData();
  renderGallery(data);
  getFilteredPictures(data);
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
  } catch (err) {
    hideModal();
  }
});
