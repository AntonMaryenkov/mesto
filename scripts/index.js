import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.page__popup-profile');
const closeIcon = profilePopup.querySelector('.popup__close-icon');
const profileName = profile.querySelector('.profile__name');
const profileJobs = profile.querySelector('.profile__jobs');
const profileForm = profilePopup.querySelector('.popup__form_profile');
const nameInput = profileForm.elements['name-profile'];
const jobsInput = profileForm.elements['popup-jobs'];
const cardPopup = document.querySelector('.page__popup-cards');  // получить popup для добавления карточек
const cardPopupOpenButton = profile.querySelector('.profile__add-button');  // получить кнопку  открытия popup'a для добавления карточек
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-icon');  // получить кнопку внутри popup'a для добавления карточек - "закрыть"
const cardForm = document.querySelector('.popup__form_card'); // получить форму для загрузки карточек
const imagePopup = document.querySelector('.page__popup-image');  // получить popup с увеличенной фотографией
const popupImg = imagePopup.querySelector('.popup__image');  // получить popup с большой фотографией
const popupImageText = imagePopup.querySelector('.popup__image-span');  // получить подпись к большой фотографии
const buttonClosePopupImage = imagePopup.querySelector('.popup__close-icon'); // получаем иконку "закрыть" popup с большой фотографией
const elementsSection = document.querySelector('.elements'); // получить секцию elements
// объект настроек с классами формы
const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profilFormValidator = new FormValidator(formConfig, profileForm);
cardFormValidator.enableValidation();
profilFormValidator.enableValidation();

const cardTemplate = document.querySelector('#card-template');

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
// Загружаем карточки из массива 
initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, cardTemplate);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    elementsSection.prepend(cardElement);
});

function closeEsc(e) {  // функция закрытия попапа по нажатию на Esc
    const activePopup = document.querySelector('.popup_visible');
    if (e.keyCode == 27) {
        closePopup(activePopup);
    }
}

function openFormIsValid(popup) { // функция убирает модификаторы об ошибке при валидности полей формы 
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(function (input) {
        if (input.validity.valid) {
            input.classList.remove('popup__input_type_error');
            const erorrSpan = popup.querySelector(`#${input.id}-error`);
            erorrSpan.classList.remove('popup__error_visible');
            popup.querySelector('.popup__button').classList.remove('popup__button_disabled');
        }
    });
}
function removeErorr(popup) { // функция сброса ошибок валидации  
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(function (input) {
        input.classList.remove('popup__input_type_error');
    });
    popup.querySelector('.popup__button').classList.add('popup__button_disabled');
    const erorrSpanList = Array.from(popup.querySelectorAll('.popup__error'));
    erorrSpanList.forEach(function (erorrSpan) {
        erorrSpan.classList.remove('popup__error_visible');
    });
}

function openPopup(popupElement) {  // фунция открытия попапа
    popupElement.classList.add('popup_visible');
    document.addEventListener('keyup', closeEsc); // добавляем слушатель событий, закрывающий модальное окно по нажатию на Esc
}

function closePopup(popupElement) {  // функция закрытия попапа
    popupElement.classList.remove('popup_visible');
    document.removeEventListener('keyup', closeEsc); // удаляем слушатель событий, закрывающий модальное окно по нажатию на Esc
}

function closePopupClickOverlay(event, popupElement) {  // функция закрытия формы при клике на оверлей
    if (event.target !== event.currentTarget) return false;
    closePopup(popupElement);
}

editButton.addEventListener('click', function () {  // слушатель на клик на кнопку "редактировать профиль"
    nameInput.value = profileName.textContent;
    jobsInput.value = profileJobs.textContent;
    openPopup(profilePopup);
    openFormIsValid(profilePopup);
});
closeIcon.addEventListener('click', function () {   // слушатель на клик на кнопку "закрыть попап"
    closePopup(profilePopup);
});
profilePopup.addEventListener('click', function (event) {  // слушатель на клик за пределы попап формы
    closePopupClickOverlay(event, profilePopup);
});

function formSubmitHandler(evt) {  // функция слушателя сабмита формы профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobs.textContent = jobsInput.value;
    closePopup(profilePopup);
}
profileForm.addEventListener('submit', formSubmitHandler); // слушатель сабмита формы профиля

cardPopupOpenButton.addEventListener('click', function () {  // слушатель на клик на кнопку открыть
    cardForm.reset();
    openPopup(cardPopup);
    removeErorr(cardPopup);
});

cardPopupCloseButton.addEventListener('click', function () {  // закрыть popup для добавления карточек
    closePopup(cardPopup);
});

cardPopup.addEventListener('click', function (event) {  // событие при клике за пределы popup'a
    closePopupClickOverlay(event, cardPopup);
});

// функция для загрузки названия и ссылки на фото для новой карточки
function createCard(data) {
    // Создадим экземпляр карточки
    const card = new Card(data, cardTemplate);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    elementsSection.prepend(cardElement);

    return cardElement;
}

function addCard(data) {
    elementsSection.prepend(createCard(data));
}

// слушатель на форму по submit, при клике на "Создать" загружаем значения из полей формы
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const name = cardForm.elements['name-card'];  //получить инпуты формы
    const link = cardForm.elements['img-link'];
    const newCard = [
        {
            name: '',
            link: ''
        }
    ]

    newCard.name = name.value;
    newCard.link = link.value;

    addCard(newCard);

    name.value = '';
    link.value = '';

    closePopup(cardPopup);
});

// функцией получаем src и название из карточки
function receivingData(event) {
    const imageCard = event.target;   // фото внутри карточки
    const element = event.target.closest('.element');  // поднимаемся выше до родителя
    const titleImage = element.querySelector('.element__heading') // выбираем ребенка - название фотографии
    popupImg.src = imageCard.src;  // подставляем значения: путь к фотографии
    popupImg.alt = imageCard.alt;
    popupImageText.textContent = titleImage.textContent; // и её название
}

buttonClosePopupImage.addEventListener('click', function () {  // закрытие popup-фотографии при клике на икоку "закрыть
    closePopup(imagePopup);
});

imagePopup.addEventListener('click', function (event) {  // слушатель при клике за пределы popup-фотографии
    closePopupClickOverlay(event, imagePopup);
})

export { openPopup, receivingData, imagePopup, initialCards };