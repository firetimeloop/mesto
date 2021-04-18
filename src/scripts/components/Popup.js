export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._closeButton.removeEventListener('click', this.close);
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners(){
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
