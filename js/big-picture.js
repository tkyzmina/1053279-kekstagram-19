'use strict';
(function () {
  var COMMENTS_SHOW = 5;
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var socialCommentItem = document.querySelector('.social__comment');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsAddBtn = document.querySelector('.comments-loader');
  var restComments;

  var show = function (objData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objData.url;
    bigPicture.querySelector('.likes-count').textContent = objData.likes;
    bigPicture.querySelector('.social__caption').textContent = objData.description;


    var commentsArrLengt = objData.comments.length;
    var commentsArray = objData.comments;
    restComments = commentsArray.slice(0);
    console.log(restComments);
    renderComments(prepareComments(commentsArray));

  };
  // ___________________________________________________

  var commentsCounter = function (arr) {
    for (var i = 0; i <= arr.length; i++) {
      commentCount.textContent = i + ' из ' + arr.length + ' комментариев';
    }
  };

  var prepareComments = function (comments) {
    if (comments.length > COMMENTS_SHOW) {
      commentsAddBtn.classList.remove('hidden');
      commentsCounter(comments);
      return comments.splice(0, COMMENTS_SHOW);
    }
    commentsAddBtn.classList.add('hidden');
    return comments.splice(0, comments.length);
  };

  commentsAddBtn.addEventListener('click', function () {
    renderComments(prepareComments(restComments));
  });
  // _______________________________________________

  var renderComments = function (array) {
    socialComments.innerHTML = '';
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      var element = getComment(item);
      fragment.appendChild(element);
    });
    socialComments.appendChild(fragment);
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
