import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._element = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleFormSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  open(){
    super.open();
    const submitButton = this._element.querySelector('.popup__submit-button');
    submitButton.disabled = true;
    submitButton.classList.add('.popup__submit-button_disabled');
  }

  getElement(){
    return this._element;
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
    this._element.addEventListener('submit', this._handleFormSubmit);
  }

  close(){
    super.close();
    this._element.reset();
  }
}
