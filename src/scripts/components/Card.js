export default class Card {
  constructor(item, templateSelector, currentUserId, handleCardClick, handleTrashClick, handleLikeClick, handleUnlikeClick) {
    this._title = item.name;
    this._image = item.link;
    this._imageId = item._id;
    this._authorId = item.owner._id;
    this._currentUserId = currentUserId;
    this._liked = item.likes.filter(e => e._id === this._currentUserId).length > 0;
    this._likeNumber = item.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(`#${this._templateSelector}`)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
    const elementLikeNumber = this._element.querySelector('.element__like-number');
    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementLikeNumber.textContent = this._likeNumber;
    this._element.id = this._imageId;
    this._element.querySelector('.element__name').textContent = this._title;
    if (this._authorId !== this._currentUserId) {
      this._element.querySelector('.element__trash-icon').classList.add('element__trash-icon_disabled');
    }
    if (this._liked) {
      this._element.querySelector('.element__like-icon').classList.add('element__like-icon_pushed');
    }
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__trash-icon').addEventListener('click', this._handleTrashClick.bind(this));
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._title,
        src: this._image
      });
    });
    this._elementLikeButton = this._element.querySelector('.element__like-icon');
    this._elementLikeButton.addEventListener('click', this._handleToggleLikeButton.bind(this));
  }

  _handleTrashClick() {
    this._handleTrashClick();
  }

  _handleUnlikeClick() {
    this._handleUnlikeClick();
  }

  _handleLikeClick() {
    this._handleLikeClick();
  }

  _handleToggleLikeButton(){
    if (this._elementLikeButton.classList.contains('element__like-icon_pushed')){
      this._handleUnlikeClick();
    }
    else{
      this._handleLikeClick();
    }
    this._elementLikeButton.classList.toggle('element__like-icon_pushed');
  }
}
