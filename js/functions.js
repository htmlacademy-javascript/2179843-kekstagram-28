//Функция для проверки длины строки.

function checkLength (string, limit) {
  if (string.length > limit) {
    return false;
  }
  return true;
}
checkLength();

//Функция для проверки, является ли строка палиндромом.

function checkPalindrome (str) {

  str = str.toLowerCase();
  const lastIndex = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[lastIndex - i]) {
      return false;
    }
  }
  return true;
}
checkPalindrome();

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

function getNumber (str) {

  if (str.replace(/\D/g,'') === '') {
    return NaN;
  }
  return str.replace(/\D/g,'');
}
getNumber();

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
function formNewString (str, length, padString) {
  return str.padStart(length, padString);
}
formNewString();

