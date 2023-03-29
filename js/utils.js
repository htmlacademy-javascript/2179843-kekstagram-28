const ALERT_SHOW_TIME = 5000;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const createRandomIntFromRange = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительным!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomizeElements = (arr) => {
  const Array = arr.slice();
  const elements = [];
  const ArrayLength = arr.length;
  for (let i = 0; i < ArrayLength; i++) {
    const randomId = createRandomIntFromRange(0, Array.length - 1);
    elements.push(Array[randomId]);
    Array.splice(randomId, 1);
  }
  return elements;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { debounce, isEscapeKey, showAlert, randomizeElements };
