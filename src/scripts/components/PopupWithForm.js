import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._element = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleFormSubmit;
  }

  open(){
    super.open();
    this._setEventListeners();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input-text-box');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleFormSubmit(evt){
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._handleFormSubmit.bind(this));
  }

  close(){
    super.close();
    this._element.removeEventListener('submit', this._handleFormSubmit.bind(this));
    this._element.reset();
  }
}
