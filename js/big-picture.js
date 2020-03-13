'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var socialCommentItem = document.querySelector('.social__comment');

  var show = function (objData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objData.url;
    bigPicture.querySelector('.likes-count').textContent = objData.likes;
    bigPicture.querySelector('.social__caption').textContent = objData.description;

    renderComments(objData.comments);
  };

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
    cloneComment.querySelector('.social__text').textContent = obj.message;

    return cloneComment;
  };

  window.bigPicture = {
    show: show,
  };

})();
