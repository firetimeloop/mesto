import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(objData){
    const imageElement = this._popup.querySelector('.popup__image');
    const imageDescriptionElemnt = this._popup.querySelector('.popup__image-description');
    imageElement.src = objData.link;
    imageElement.alt = objData.name;
    imageDescriptionElemnt.textContent = objData.name;
    super.open();
  }
}
