import "core-js/stable";
import "regenerator-runtime/runtime";
import '../pages/index.css';

import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';


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
  return card;
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
const deletePopup = new PopupWithForm('.popup_type_deleting-card', () => {});
deletePopup.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
  avatarPopup.changeButtonText('Сохранить...');
  api.editAvatar(inputValues['edit-bio'])
    .then(() => {
      userData.setUserAvatar(inputValues['edit-bio']);
      avatarPopup.changeButtonText('Сохранить');
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
avatarPopup.setEventListeners();
const popupChangeProfile = new PopupWithForm('.popup_type_changing-profile', (inputValues) => {
  popupChangeProfile.changeButtonText('Сохранить...');
  api.editUserInfo(inputValues['edit-name'], inputValues['edit-bio'])
    .then(() => {
      userData.setUserInfo(inputValues['edit-name'], inputValues['edit-bio']);
      popupChangeProfile.changeButtonText('Сохранить');
      popupChangeProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const inputNameBox = popupChangeProfile.getElement().querySelector('.popup__input-text-box_type_name');
const inputBioBox = popupChangeProfile.getElement().querySelector('.popup__input-text-box_type_bio');

popupChangeProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_type_adding-card', (inputValues) => {
  popupAddCard.changeButtonText('Сохранить...');
  api.postCard(inputValues['edit-name'], inputValues['edit-bio'])
    .then((res) => {
      const card = createCard(res, cardTemplateName, userData.getUserId(), () => {
        imagePopup.open(res);
      }, () => {
        deletePopup.setSubmitHandler(() => {
          deletePopup.changeButtonText('Да...');
          api.deleteCard(res._id)
            .then(() => {
              card.removeCard();
              deletePopup.changeButtonText('Да');
              deletePopup.close();
            }).catch((err) => {
              console.log(err);
            });
        });
        deletePopup.open();
      }, () => {
        api.likeCard(res._id).then((res) => {
          card.changeLikesNumber(res.likes.length);
          card.pushLikeButton();
        });
      }, () => {
        api.unlikeCard(res._id).then((res) => {
          card.changeLikesNumber(res.likes.length);
          card.pushLikeButton();
        });
      });
      cardList.addItem(card.generateCard());
    }).then(() => {
      popupAddCard.close();
      popupAddCard.changeButtonText('Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });

});
popupAddCard.setEventListeners();


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item, cardTemplateName, userData.getUserId(), () => {
      imagePopup.open(item);
    }, () => {
      deletePopup.setSubmitHandler(() => {
        deletePopup.changeButtonText('Да...');
        api.deleteCard(item._id)
          .then(() => {
            card.removeCard();
            deletePopup.changeButtonText('Да');
            deletePopup.close();
          }).catch((err) => {
            console.log(err);
          });
      });
      deletePopup.open();
    }, () => {
      api.likeCard(item._id).then((res) => {
        card.changeLikesNumber(res.likes.length);
        card.pushLikeButton();
      })
      .catch((err) => {
        console.log(err);
      });
    }, () => {
      api.unlikeCard(item._id).then((res) => {
        card.changeLikesNumber(res.likes.length);
        card.pushLikeButton();
      })
      .catch((err) => {
        console.log(err);
      });
    });
    cardList.addItem(card.generateCard());
  }
}, '.elements');


editButton.addEventListener('click', () => {
  popupChangeProfile.open();
  const userDataObj = userData.getUserInfo();
  inputNameBox.value = userDataObj.name;
  inputBioBox.value = userDataObj.bio;
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

