let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");

let formElement = document.querySelector(".popup__form");

let nameInput = formElement.querySelector(".popup__input-text-box_type_name");
let jobInput = formElement.querySelector(".popup__input-text-box_type_bio");

let likeButtons = document.querySelectorAll(".element__like-icon");

let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close-button");


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup()
}


editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleProfileSubmit);

likeButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    button.classList.toggle("element__like-icon_pushed");
  });
});
