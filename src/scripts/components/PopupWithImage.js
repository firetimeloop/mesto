import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._imageDescriptionElemnt = this._popup.querySelector('.popup__image-description');
  }
  open(objData){
    this._imageElement.src = objData.link;
    this._imageElement.alt = objData.name;
    this._imageDescriptionElemnt.textContent = objData.name;
    super.open();
  }
}
