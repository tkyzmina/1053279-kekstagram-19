'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');


  var show = function (objData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objData.url;
    bigPicture.querySelector('.likes-count').textContent = objData.likes;
    bigPicture.querySelector('.social__caption').textContent = objData.description;

    // debugger;
  };

  window.bigPicture = {
    show: show,
    getComment: getComment
  };

  var socialComments = document.querySelector('.social__comments');
  var socialCommentItem = document.querySelector('.social__comment');


  var getComment = function (commentData) {
    var cloneComment = socialCommentItem.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = commentData.comments.avatar;
    cloneComment.querySelector('.social__text').textContent = commentData.comments.message;

    socialComments.appendChild(cloneComment);
    return cloneComment;
  };

  // var picture = document.querySelector('.picture');
  // picture.addEventListener('click', function () {
  //   console.log();
  // });



})();
