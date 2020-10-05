const profile = document.querySelector('.profile'); // секция profile
const elementsSection = document.querySelector('.elements'); // получить секцию elements
const cardTemplate = document.querySelector('#card-template');
const profileName = profile.querySelector('.profile__name'); // информация о пользователе на странице "имя"
const profileJobs = profile.querySelector('.profile__jobs'); // информация о пользователе на странице "о себе"
const editButton = profile.querySelector('.profile__edit-button'); // кнопка редактировать профиль
const profilePopup = document.querySelector('.page__popup-profile');  // получить popup с информацией о пользователе
const profileForm = profilePopup.querySelector('.popup__form_profile'); // получить форму редактирования инф. о пользователе
const nameInput = profileForm.elements['name-input']; // поле формы "имя"
const jobsInput = profileForm.elements['jobs-input']; // поле формы "о себе"
const cardPopup = document.querySelector('.page__popup-cards');  // получить popup для добавления карточек
const cardForm = document.querySelector('.popup__form_card'); // получить форму для загрузки карточек
const cardPopupOpenButton = profile.querySelector('.profile__add-button');  // получить кнопку  открытия popup'a для добавления карточек
const imagePopup = document.querySelector('.page__popup-image');  // получить popup с увеличенной фотографией
// объект настроек с классами формы
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// массив с карточками
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

export { formConfig, initialCards, profilePopup, cardPopup, imagePopup, editButton, cardPopupOpenButton, profile, profileName, profileJobs, profileForm, nameInput, jobsInput, cardForm, elementsSection, cardTemplate };
