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

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input-text-box_type_name');
let jobInput = formElement.querySelector('.popup__input-text-box_type_bio');

let likeButtons = document.querySelectorAll('.element__like-icon');

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

let closeButton = document.querySelector('.popup__close-button');


function addCardToList(elementData) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = elementData.link;
  cardImage.alt = elementData.name;
  cardElement.querySelector('.element__name').textContent = elementData.name;
  cardsList.prepend(cardElement);
}

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup();
}


initialCards.forEach(addCardToList);


editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleProfileSubmit);

likeButtons.forEach(function(button) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__like-icon_pushed');
  });
});
