import "core-js/stable";
import "regenerator-runtime/runtime";
import '../pages/index.css';

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'ec5ef281-6ed1-433e-a11b-958cd40a7731',
    'Content-Type': 'application/json'
  }
});

const userInfo = await api.getUserInfo();
const initialCards = await api.getInitialCards();


function createCard(data, template, currentUserId, clickHandler, trashHandler, likeHandler, unlikeHandler){
  const card = new Card(data, template, currentUserId, clickHandler, trashHandler, likeHandler, unlikeHandler);
  const cardElement = card.generateCard();
  return cardElement;
}

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const avatarButton = document.querySelector('.profile__edit-avatar');

const cardTemplateName = 'element';

const userData = new UserInfo('.profile__name', '.profile__bio', '.profile__avatar', userInfo._id);
userData.setUserInfo(userInfo.name, userInfo.about);
userData.setUserAvatar(userInfo.avatar);

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();
const deletePopup = new PopupWithForm('.popup_type_deleting-card', () => {
  deletePopup._popup.querySelector('.popup__submit-button').textContent = "Да...";
  api.deleteCard(deletePopup._objData._id)
    .finally(
      () => {
        document.getElementById(`${deletePopup._objData._id}`).remove();
        deletePopup._popup.querySelector('.popup__submit-button').textContent = "Да";
        deletePopup.close();
      });
});
deletePopup.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
  avatarPopup._popup.querySelector('.popup__submit-button').textContent = "Сохранить...";
  api.editAvatar(inputValues['edit-bio'])
    .finally(() => {
      userData.setUserAvatar(inputValues['edit-bio']);
      avatarPopup._popup.querySelector('.popup__submit-button').textContent = "Сохранить";
      avatarPopup.close();
    });
});
avatarPopup.setEventListeners();
const popupChangeProfile = new PopupWithForm('.popup_type_changing-profile', (inputValues) => {
  popupChangeProfile._popup.querySelector('.popup__submit-button').textContent = "Сохранить...";
  api.editUserInfo(inputValues['edit-name'], inputValues['edit-bio'])
    .finally(() => {
      userData.setUserInfo(inputValues['edit-name'], inputValues['edit-bio']);
      popupChangeProfile._popup.querySelector('.popup__submit-button').textContent = "Сохранить";
      popupChangeProfile.close();
    });
});
popupChangeProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_adding-card', (inputValues) => {
  popupAddCard._popup.querySelector('.popup__submit-button').textContent = "Сохранить...";
  api.postCard(inputValues['edit-name'], inputValues['edit-bio'])
    .then((res) => {
      const card = createCard(res, cardTemplateName, userInfo._id, () => {
        imagePopup.open(res);
      }, () => {
        deletePopup.open(res);
      }, () => {
        api.likeCard(res._id).then((res) => {
          document.getElementById(`${res._id}`).querySelector('.element__like-number').textContent = res.likes.length;
        });
      }, () => {
        api.unlikeCard(res._id).then((res) => {
          document.getElementById(`${res._id}`).querySelector('.element__like-number').textContent = res.likes.length;
        });
      });
      cardList.addItem(card);
    }).finally(() => {
      popupAddCard.close();
      popupAddCard._popup.querySelector('.popup__submit-button').textContent = "Сохранить";
    });

});
popupAddCard.setEventListeners();


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item, cardTemplateName, userInfo._id, () => {
      imagePopup.open(item);
    }, () => {
      deletePopup.open(item);
    }, () => {
      api.likeCard(item._id).then((res) => {
        document.getElementById(`${res._id}`).querySelector('.element__like-number').textContent = res.likes.length;
      });
    }, () => {
      api.unlikeCard(item._id).then((res) => {
        document.getElementById(`${res._id}`).querySelector('.element__like-number').textContent = res.likes.length;
      });
    });
    cardList.addItem(card);
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
  formNewCardValidation.toggleButtonState();
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  formNewCardValidation.toggleButtonState();
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

const formAvatar = document.querySelector('.popup__form_type_url');
const formAvatarValidation = new FormValidator(settingObj, formAvatar);
formAvatarValidation.enableValidation();

