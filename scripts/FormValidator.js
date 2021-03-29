export class FormValidator {
  constructor(settingObj, formElement) {
    this._formElement = formElement;
    this._inputSelector = settingObj.inputSelector;
    this._submitButtonSelector = settingObj.submitButtonSelector;
    this._inactiveButtonClass = settingObj.inactiveButtonClass;
    this._inputErrorClass = settingObj.inputErrorClass;
    this._errorClass = settingObj.errorClass;
    this._formElementInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formElementButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._formElementInputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formElementButtonElement.disabled = true;
      this._formElementButtonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._formElementButtonElement.disabled = false;
      this._formElementButtonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();

    this._formElementInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

