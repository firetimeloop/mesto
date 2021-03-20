const initialCards = [
  {
    name: 'Карачаево-черкесия',
    link: "./images/place-Karachaevsk.jpg"
  },
  {
    name: 'Гора Эльбрус',
    link: "./images/place-Elbrus.png"
  },
  {
    name: 'Домбай',
    link: "./images/place-Dombuy.png"
  },
  {
    name: 'Брайс-каньон',
    link: "./images/place-Bryce-canyon.jpg"
  },
  {
    name: 'Фаншипан',
    link: "./images/place-Fanshipan.jpg"
  },
  {
    name: 'Золотые ворота',
    link: "./images/place-Golden-gate.jpg"
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#element').content;
const cardsList = document.querySelector('.elements');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const formEditElement = document.querySelector('.popup__form_type_edit');

const nameInput = formEditElement.querySelector('.popup__input-text-box_type_name');
const jobInput = formEditElement.querySelector('.popup__input-text-box_type_bio');

const popupChangeProfile = document.querySelector('.popup_type_changing-profile');
const editButton = document.querySelector('.profile__edit-button');

const closeButtonEdit = popupChangeProfile.querySelector('.popup__close-button');

const popupAddCard = document.querySelector('.popup_type_adding-card');
const addButton = document.querySelector('.profile__add-button');

const closeButtonAdd = popupAddCard.querySelector('.popup__close-button');

const formAddElement = document.querySelector('.popup__form_type_add');

const nameCardInput = formAddElement.querySelector('.popup__input-text-box_type_card-name');
const cardSourceInput = formAddElement.querySelector('.popup__input-text-box_type_src');

const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');

const imageElement = document.querySelector('.popup__image');
const imageDescriptionElemnt = document.querySelector('.popup__image-description');

const popups = document.querySelectorAll('.popup');


function createCardToList(elementData) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = elementData.link;
  cardImage.alt = elementData.name;
  cardElement.querySelector('.element__name').textContent = elementData.name;
  cardElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__trash-icon')) {
      removeElement(evt.target);
    }
  });
  cardElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__image')) {
      openImagePopup({
        name: evt.target.closest('.element').querySelector('.element__name').textContent,
        src: evt.target.src
      });
    }
  });
  cardElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like-icon')) {
      evt.target.classList.toggle('element__like-icon_pushed');
    }
  });
  return cardElement;
}

function addCardToList(cardElement){
  cardsList.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscFromPopup);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupChangeProfile);
}

function openImagePopup(objData) {
  imageElement.src = objData.src;
  imageElement.alt = objData.name;
  imageDescriptionElemnt.textContent = objData.name;
  openPopup(popupImage);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscFromPopup);
}

function removeElement(element) {
  element.closest('.element').remove();
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(popupChangeProfile);
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  const dataObj = {
    name: nameCardInput.value,
    link: cardSourceInput.value
  };
  const card = createCardToList(dataObj);
  addCardToList(card);
  closePopup(popupAddCard);
}

function handleEscFromPopup (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null){
      closePopup(popup);
    }
  }
}


initialCards.forEach((elementData) => {
    const card = createCardToList(elementData);
    addCardToList(card);
  }
);


editButton.addEventListener('click', openProfilePopup);

closeButtonEdit.addEventListener('click', () => { closePopup(popupChangeProfile);});

formEditElement.addEventListener('submit', handleProfileSubmit);

addButton.addEventListener('click', () => { openPopup(popupAddCard);});

closeButtonAdd.addEventListener('click', () => { closePopup(popupAddCard);});

formAddElement.addEventListener('submit', handleAddCardSubmit);

closeButtonImage.addEventListener('click', () => { closePopup(popupImage);});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
});

