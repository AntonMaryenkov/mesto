let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeIcon = popup.querySelector('.popup__close-icon');
let savePopupButton = popup.querySelector('.popup__button');
let profileName = profile.querySelector('.profile__name');
let profileJobs = profile.querySelector('.profile__jobs');

let popupToggle = function () {
    popup.classList.toggle('popup_visible');
}

let closePopup = function (event) {
    if (event.target !== event.currentTarget) return false;
    popupToggle(event);
}

editButton.addEventListener('click', popupToggle);
closeIcon.addEventListener('click', popupToggle);
savePopupButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

let formElement = popup.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = popup.querySelector('#popup-name');
    let jobsInput = popup.querySelector('#popup-jobs');
    profileName.textContent = nameInput.value;
    profileJobs.textContent = jobsInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
