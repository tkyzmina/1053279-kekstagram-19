'use strict';
(function () {
  var COMMENTS_SHOW = 5;
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentItem = bigPicture.querySelector('.social__comment');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsAddButton = bigPicture.querySelector('.comments-loader');
  var restComments;
  var startIndex = 0;

  var show = function (objData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objData.url;
    bigPicture.querySelector('.likes-count').textContent = objData.likes;
    bigPicture.querySelector('.social__caption').textContent = objData.description;

    renderComments(objData.comments);
    document.addEventListener('keydown', onOverlayEscPress);
  };

  var close = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', function () {
    close();
  });

  var onOverlayEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      close();
    }
  };

  var updateCommentsCounter = function () {
    if (startIndex >= restComments.length) {
      commentCount.textContent = restComments.length + ' из ' + restComments.length + ' комментариев';
    } else {
      commentCount.textContent = startIndex + ' из ' + restComments.length + ' комментариев';
    }
  };

  var loadNextComments = function () {
    var nextComments = restComments.slice(startIndex, startIndex + COMMENTS_SHOW);
    var fragment = document.createDocumentFragment();
    nextComments.forEach(function (item) {
      var element = getComment(item);
      fragment.appendChild(element);
    });
    socialComments.appendChild(fragment);
    startIndex += COMMENTS_SHOW;

    if (startIndex >= restComments.length) {
      commentsAddButton.classList.add('hidden');
    }
    updateCommentsCounter();
  };

  commentsAddButton.addEventListener('click', function () {
    loadNextComments();
  });

  var renderComments = function (array) {
    socialComments.innerHTML = '';
    restComments = array.slice();
    startIndex = 0;
    commentsAddButton.classList.remove('hidden');
    loadNextComments();
  };

  var getComment = function (obj) {
    var cloneComment = socialCommentItem.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = obj.avatar;
    cloneComment.querySelector('.social__picture').alt = obj.name;
    cloneComment.querySelector('.social__text').textContent = obj.message;

    return cloneComment;
  };

  window.bigPicture = {
    show: show,
  };
})();
