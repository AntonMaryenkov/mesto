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
const avatarPopup = document.querySelector('.page__popup-avatar'); // получить popup аватара
const avatarForm = avatarPopup.querySelector('.popup__form_avatar'); // получить форму редактирования аватара
const avatarImg = profile.querySelector('.profile__avatar'); // получить img аватара
const avatarBlock = profile.querySelector('.profile__avatar-block'); // получить обертку лайка и счетчика лайков
const avatarInput = avatarForm.elements['url-avatar']; // получить поле формы аватара
const popupConfirmation = document.querySelector('.page__popup-confirmation'); // получить счетчик лайков
// объект настроек с классами формы
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { formConfig, profilePopup, cardPopup, imagePopup, editButton, cardPopupOpenButton, profile, profileName, profileJobs, profileForm, nameInput, jobsInput, cardForm, elementsSection, cardTemplate, avatarPopup, avatarForm, avatarImg, avatarInput, popupConfirmation, avatarBlock };
