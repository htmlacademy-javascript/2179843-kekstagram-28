import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentListItem = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

commentsCount.classList.remove('hidden');
commentsLoader.classList.remove('hidden');

const renderComments = (comments) => {
  commentList.innerHTML = '';
  comments.forEach((comment) => {
    const newComment = commentListItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentList.append(newComment);
  });
};

const renderPictureComments = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const showComments = (comments) => {
  const count = 5;
  const commentNodes = commentList.querySelectorAll('.social__comment');
  let commentsToShow = [];

  if (comments.length <= count) {
    commentsToShow = comments;
    commentsCount.textContent = `${commentsToShow.length} из ${commentsToShow.length} комментариев`;
    commentsLoader.classList.add('hidden');
  } else {
    commentsToShow = comments.slice(0, count);
    commentsCount.textContent = `${count} из ${comments.length} комментариев`;
    commentsLoader.classList.remove('hidden');
  }

  renderComments(commentsToShow);

  commentsLoader.addEventListener('click', () => {
    const remainingComments = comments.slice(commentNodes.length);
    const nextComments = remainingComments.slice(0, count);
    commentsToShow = commentsToShow.concat(nextComments);
    renderComments(nextComments);

    if (commentNodes.length + nextComments.length >= comments.length) {
      commentsCount.textContent = `${comments.length} из ${comments.length} комментариев`;
      commentsLoader.classList.add('hidden');
    } else {
      commentsCount.textContent = `${commentNodes.length + nextComments.length} из ${comments.length} комментариев`;
    }
  });
};

const userModalCloseElement = bigPicture.querySelector('.cancel');

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const body = document.querySelector('body');

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

userModalCloseElement.addEventListener('click', () => closeUserModal ());


const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  renderPictureComments(data);
  renderComments(data.comments);
  showComments(data.comments);
};

export {showBigPicture};
