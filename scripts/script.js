const initialCards = [
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


let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

let formEditElement = document.querySelector('.popup__form_type_edit');

let nameInput = formEditElement.querySelector('.popup__input-text-box_type_name');
let jobInput = formEditElement.querySelector('.popup__input-text-box_type_bio');

let likeButtons = document.querySelectorAll('.element__like-icon');
let trashButtons = document.querySelectorAll('.element__trash-icon');

let popupChangeProfile = document.querySelector('.popup_type_changing-profile');
let editButton = document.querySelector('.profile__edit-button');

let closeButtonEdit = popupChangeProfile.querySelector('.popup__close-button');

let popupAddCard = document.querySelector('.popup_type_adding-card');
let addButton = document.querySelector('.profile__add-button');

let closeButtonAdd = popupAddCard.querySelector('.popup__close-button');

let formAddElement = document.querySelector('.popup__form_type_add');

let nameCardInput = formAddElement.querySelector('.popup__input-text-box_type_card-name');
let cardSourceInput = formAddElement.querySelector('.popup__input-text-box_type_src');


function addCardToList(elementData) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = elementData.link;
  cardImage.alt = elementData.name;
  cardElement.querySelector('.element__name').textContent = elementData.name;
  const cardLikeButton = cardElement.querySelector('.element__like-icon');
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('element__like-icon_pushed');
  });
  const cardTrashButton = cardElement.querySelector('.element__trash-icon');
  cardTrashButton.addEventListener('click', function () {
    removeParent(cardTrashButton);
  });
  cardsList.prepend(cardElement);
}

function openPopup(popup) {
  if (popup.classList.contains('popup_type_changing-profile')){
    nameInput.value = profileName.textContent;
    jobInput.value = profileBio.textContent;
  }
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function removeParent(element) {
  element.parentElement.remove();
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(popupChangeProfile);
}

function handleAddCardSubmit (evt) {
  evt.preventDefault();
  let dataObj = {
    name: nameCardInput.value,
    link: cardSourceInput.value
  };
  addCardToList(dataObj);
  closePopup(popupAddCard);
}


initialCards.forEach(addCardToList);


editButton.addEventListener('click', () => { openPopup(popupChangeProfile);});

closeButtonEdit.addEventListener('click', () => { closePopup(popupChangeProfile);});

formEditElement.addEventListener('submit', handleProfileSubmit);

addButton.addEventListener('click', () => { openPopup(popupAddCard);});

closeButtonAdd.addEventListener('click', () => { closePopup(popupAddCard);});

formAddElement.addEventListener('submit', handleAddCardSubmit);

likeButtons.forEach(function(button) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__like-icon_pushed');
  });
});

trashButtons.forEach(function(button) {
  button.addEventListener('click', function () {
    removeParent(button);
  });
});
