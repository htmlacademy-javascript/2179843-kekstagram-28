import {getRandomInteger, generatePhotoId, generateCommentId, getRandomArrayElement} from './utils.js';

const SIMILAR_PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Очень красиво',
  'Одна из лучших фотографий',
  'Как ваши дела?',
];

const AVATARS = [
  1,
  2,
  3,
  4,
  5,
  6,
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Дима',
  'Артем',
  'Даня',
  'Андрей',
  'Юлия',
  'Виктор',
  'Гена',
  'Олег',
  'Николай',
  'Денис',
  'Георгий',
  'Матвей',
  'Катя',
  'Вика',
  'Алена',
  'Олеся',
  'Алина',
  'Ева',
  'Виталий',
  'Максим',
  'Александр',
  'Соня',
  'Валерия',
  'Никита',
  'Петр',
];

const ids = Array.from({length: SIMILAR_PHOTO_COUNT}, generatePhotoId);
const commentsIds = Array.from({length: SIMILAR_PHOTO_COUNT}, generateCommentId);

const createComment = () => ({
  id: getRandomArrayElement(commentsIds),
  avatar: `img/avatar-${ getRandomArrayElement(AVATARS) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const comments = Array.from({length: SIMILAR_PHOTO_COUNT}, createComment);

const createPhoto = () => ({
  id: getRandomArrayElement(ids),
  url: `photos/${getRandomArrayElement(ids)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  like: getRandomInteger(15,250),
  comment: comments,
});

const similarPhotos = Array.from({length: SIMILAR_PHOTO_COUNT}, createPhoto);

export {similarPhotos};
