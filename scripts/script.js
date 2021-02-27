let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__input-text-box_name");
let jobInput = formElement.querySelector(".popup__input-text-box_bio");

nameInput.value = profileName.textContent;
jobInput.value = profileBio.textContent;

let likeButtons = document.querySelectorAll(".element__like-icon");
likeButtons.forEach(function(button) {
  button.addEventListener('click', function () {
    button.classList.toggle('element__like-icon_pushed');
  });
});

let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

let closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
