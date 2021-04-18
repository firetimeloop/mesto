import '../pages/index.css';

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import { initialCards } from './utils/constants.js';

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const cardTemplateName = 'element';

const userData = new UserInfo('.profile__name', '.profile__bio');
const imagePopup = new PopupWithImage('.popup_type_image');
const popupChangeProfile = new PopupWithForm('.popup_type_changing-profile', (inputValues) => {
  userData.setUserInfo(inputValues['edit-name'], inputValues['edit-bio']);
  popupChangeProfile.close();
});
const popupAddCard = new PopupWithForm('.popup_type_adding-card', (inputValues) => {
  const dataObj = {
    name: inputValues['edit-name'],
    link: inputValues['edit-bio']
  };
  const card = new Card(dataObj, cardTemplateName, () => {
    imagePopup.open(dataObj);
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  popupAddCard.close();
});


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateName, () => {
      imagePopup.open(item);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.elements');


editButton.addEventListener('click', () => {
  popupChangeProfile.open();
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
});


cardList.renderItems();


const formSelector = '.popup__form';
const formList = Array.from(document.querySelectorAll(formSelector));
const settingObj = {
  inputSelector: '.popup__input-text-box',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};

formList.forEach((formElement) => {
  const formElementValidation = new FormValidator(settingObj, formElement);
  formElementValidation.enableValidation();
});
