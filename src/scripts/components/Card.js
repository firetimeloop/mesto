export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._title = item.name;
    this._image = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    elementImage.src = this._image;
    elementImage.alt = this._title;
    this._element.querySelector('.element__name').textContent = this._title;
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
    const elementLikeButton = this._element.querySelector('.element__like-icon');
    elementLikeButton.addEventListener('click', this._handleToggleLikeButton);
  }

  _handleTrashClick() {
    this._element.remove();
    delete this._element;
  }

  _handleToggleLikeButton(){
    this.classList.toggle('element__like-icon_pushed');
  }
}
