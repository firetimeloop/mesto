import { imageElement, imageDescriptionElemnt, openPopup, popupImage } from './index.js';


export class Card {
  constructor(item, templateSelector) {
    this._title = item.name;
    this._image = item.link;
    this._templateSelector = templateSelector;
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
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__name').textContent = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__trash-icon')) {
        this._handleTrashClick();
      }
    });
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__image')) {
        this._handleOpenImagePopup({
          name: this._title,
          src: this._image
        });
      }
    });
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like-icon')) {
        this._handleToggleLikeButton(evt.target.classList);
      }
    });
  }

  _handleTrashClick() {
    this._element.remove();
  }

  _handleOpenImagePopup(objData){
    imageElement.src = objData.src;
    imageElement.alt = objData.name;
    imageDescriptionElemnt.textContent = objData.name;
    openPopup(popupImage);
  }

  _handleToggleLikeButton(obj){
    obj.toggle('element__like-icon_pushed');
  }
}
