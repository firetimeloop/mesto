import '../pages/index.css';

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import { initialCards } from './utils/constants.js';

function createCard(data, template, clickHandler){
  return new Card(data, template, clickHandler);
}

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const cardTemplateName = 'element';

const userData = new UserInfo('.profile__name', '.profile__bio');
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup._setEventListeners();
const popupChangeProfile = new PopupWithForm('.popup_type_changing-profile', (inputValues) => {
  userData.setUserInfo(inputValues['edit-name'], inputValues['edit-bio']);
  popupChangeProfile.close();
});
popupChangeProfile._setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_adding-card', (inputValues) => {
  const dataObj = {
    name: inputValues['edit-name'],
    link: inputValues['edit-bio']
  };
  const card = createCard(dataObj, cardTemplateName, () => {
    imagePopup.open(dataObj);
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  popupAddCard.close();
});
popupAddCard._setEventListeners();


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item, cardTemplateName, () => {
      imagePopup.open(item);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.elements');


editButton.addEventListener('click', () => {
  popupChangeProfile.open();
  const userDataObj = userData.getUserInfo();
  const elementPopup = popupChangeProfile.getElement();
  elementPopup.querySelector('.popup__input-text-box_type_name').value = userDataObj.name;
  elementPopup.querySelector('.popup__input-text-box_type_bio').value = userDataObj.bio;
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
});


cardList.renderItems();


const settingObj = {
  inputSelector: '.popup__input-text-box',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
};

const formBio = document.querySelector('.popup__form_type_edit');
const formBioValidation = new FormValidator(settingObj, formBio);
formBioValidation.enableValidation();

const formNewCard = document.querySelector('.popup__form_type_add');
const formNewCardValidation = new FormValidator(settingObj, formNewCard);
formNewCardValidation.enableValidation();

