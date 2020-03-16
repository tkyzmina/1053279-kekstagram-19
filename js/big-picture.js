'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = document.querySelector('.social__comments');
  var socialCommentItem = document.querySelector('.social__comment');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsAddBtn = document.querySelector('.comments-loader');

  var show = function (objData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objData.url;
    bigPicture.querySelector('.likes-count').textContent = objData.likes;
    bigPicture.querySelector('.social__caption').textContent = objData.description;


    // ??????????????????????????
    var commentsArrLengt = objData.comments.length;
    var commentsArray = objData.comments;
    if (commentsArrLengt <= 5) {
      commentsAddBtn.classList.add('hidden');
    }
    t(objData.comments);
    // ++++++++++++++++++++++++++++

    renderComments(commentsArray);
    // rendrXXX(commentsArray);


  };


  // var rendrXXX = function (array) {
  //   socialComments.innerHTML = '';
  //   var fragment = document.createDocumentFragment();
  //   var item;
  //   for (var i = 0; i <= array.length; i++) {
  //     var element = getComment(item);
  //     fragment.appendChild(element);
  //     socialComments.appendChild(fragment);
  //   }

  // };


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

  var t = function (arr) {
    for (var i = 0; i <= arr.length; i++) {
      commentCount.textContent = i + ' из ' + arr.length + ' комментариев';
    }
  };

  window.bigPicture = {
    show: show,
  };

})();
