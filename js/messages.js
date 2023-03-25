// Получаем ссылки на элементы шаблонов
const successTemplate = document.querySelector('.success');
const errorTemplate = document.querySelector('.error');

function createElementFromTemplate(template) {
  const element = template.content.cloneNode(true).firstElementChild;
  return element;
}

function showSuccessMessage() {
  const successElement = createElementFromTemplate(successTemplate);
  document.body.appendChild(successElement);
}

function showErrorMessage() {
  const errorElement = createElementFromTemplate(errorTemplate);
  document.body.appendChild(errorElement);
}

export{ showErrorMessage, showSuccessMessage };
