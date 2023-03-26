
import {getData, sendData} from './api.js';
import { renderGallery } from './gallery.js';
import { showAlert } from './utils.js';
import { hideModal, onFormSubmit } from './form.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
