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
  'Макисм',
  'Александр',
  'Соня',
  'Валерия',
  'Никита',
  'Петр',
];

const SIMILAR_PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100);

const IDS = Array.from({length: SIMILAR_PHOTO_COUNT}, generatePhotoId);
const COMMENTS_IDS = Array.from({length: SIMILAR_PHOTO_COUNT}, generateCommentId);

const createComment = () => ({
  id: getRandomArrayElement(COMMENTS_IDS),
  avatar: `img/avatar-${ getRandomArrayElement(AVATARS) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const COMMENTS = Array.from({length: SIMILAR_PHOTO_COUNT}, createComment);

const createPhoto = () => ({
  id: getRandomArrayElement(IDS),
  url: `photos/${getRandomArrayElement(IDS)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  like: getRandomInteger(15,250),
  comment: getRandomArrayElement(COMMENTS),
});

const similarPhoto = Array.from({length: SIMILAR_PHOTO_COUNT}, createPhoto);

console.log(similarPhoto);

