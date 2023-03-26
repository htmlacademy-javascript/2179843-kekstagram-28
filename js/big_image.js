import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentList = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const MAX_COMMENTS_AMOUNT = 5;
let count = 0;

const createComment = (comment) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  newComment.appendChild(commentAvatar);

  const commentMessage = document.createElement('p');
  commentMessage.classList.add('social__text');
  commentMessage.textContent = comment.message;
  newComment.appendChild(commentMessage);
  return newComment;
};

const showBigPicture = (picture) => {

  const onModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const onModalCloseButtonClick = () => {
    closeBigPicture();
  };

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscKeydown);
    closeButton.removeEventListener('click', onModalCloseButtonClick);
    commentsLoader.removeEventListener('click', commentsLoaderOnClick);
    count = 0;
  }

  const renderMoreComments = () => {
    commentList.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    const visibleComments = picture.comments.slice(0, count + MAX_COMMENTS_AMOUNT);
    visibleComments.forEach((comment) => {
      commentsFragment.appendChild(createComment(comment));
    });
    commentList.appendChild(commentsFragment);
    commentsLoader.classList.toggle('hidden', picture.comments.length === visibleComments.length);
    commentsCount.innerHTML = `${visibleComments.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  };

  function commentsLoaderOnClick() {
    count += MAX_COMMENTS_AMOUNT;
    renderMoreComments();
  }

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  renderMoreComments();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  closeButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

export { showBigPicture };
