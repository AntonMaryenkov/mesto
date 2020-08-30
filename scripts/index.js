const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.page__popup-profile');
const closeIcon = popupProfile.querySelector('.popup__close-icon');
const savePopupButton = popupProfile.querySelector('.popup__button');
const profileName = profile.querySelector('.profile__name');
const profileJobs = profile.querySelector('.profile__jobs');
const formProfile = popupProfile.querySelector('.popup__form_profile');
const nameInput = formProfile.elements['name-profile'];
const jobsInput = formProfile.elements['popup-jobs'];
const popup = document.querySelector('.popup');

function closeEsc(e) {  // функция закрытия попапа по нажатию на Esc
    const popapActive = document.getElementsByClassName('popup_visible');
    if (e.keyCode == 27) {
        popapActive[0].classList.remove('popup_visible');
        document.removeEventListener('keyup', closeEsc); // удаляем слушатель событий, закрывающий модальное окно по нажатию на Esc
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
}

function closePopupClickOverlay(popupElement) {  // функция закрытия формы при клике на оверлей
    if (event.target !== event.currentTarget) return false;
    popupElement.classList.remove('popup_visible');
}

editButton.addEventListener('click', function () {  // слушатель на клик на кнопку "редактировать профиль"
    nameInput.value = profileName.textContent;
    jobsInput.value = profileJobs.textContent;
    openPopup(popupProfile);
    openFormIsValid(popupProfile);
});
closeIcon.addEventListener('click', function () {   // слушатель на клик на кнопку "закрыть попап"
    closePopup(popupProfile);
});
popupProfile.addEventListener('click', function () {  // слушатель на клик за пределы попап формы
    closePopupClickOverlay(popupProfile);
});

function formSubmitHandler(evt) {  // функция слушателя сабмита формы профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobs.textContent = jobsInput.value;
    closePopup(popupProfile);
}
formProfile.addEventListener('submit', formSubmitHandler); // слушатель сабмита формы профиля

const popupCards = document.querySelector('.page__popup-cards');  // получить popup для добавления карточек

const openedPopupCards = profile.querySelector('.profile__add-button');  // получить кнопку  открытия popup'a для добавления карточек
const closeIconPopupCards = popupCards.querySelector('.popup__close-icon');  // получить кнопку внутри popup'a для добавления карточек - "закрыть"
const formCard = document.querySelector('.popup__form_card'); // получить форму для загрузки карточек
const saveButtonPopupCard = popupCards.querySelector('.popup__button') // получить кнопку "Создать" в popup'e для добавления карточек

openedPopupCards.addEventListener('click', function () {  // слушатель на клик на кнопку открыть
    formCard.reset();
    openPopup(popupCards);
    removeErorr(popupCards);
});

closeIconPopupCards.addEventListener('click', function () {  // закрыть popup для добавления карточек
    closePopup(popupCards);
});

popupCards.addEventListener('click', function () {  // событие при клике за пределы popup'a
    closePopupClickOverlay(popupCards);
});

const elementsSection = document.querySelector('.elements'); // получить секцию elements

// функция для загрузки названия и ссылки на фото для новой карточки

function createCard(nameImage, linkImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__heading').textContent = nameImage;
    cardElement.querySelector('.element__image').src = linkImage;
    cardElement.querySelector('.element__image').alt = nameImage;

    const buttonLikeCard = cardElement.querySelector('.element__like'); // получить кнопку лайк

    buttonLikeCard.addEventListener('click', function (evt) {  // слушатель клика кнопки лайк
        evt.target.classList.toggle('element__like_active');
    });

    const buttonDeleteCard = cardElement.querySelector('.element__delete-icon'); // получить иконку "удалить карточку"

    buttonDeleteCard.addEventListener('click', function () { // слушатель клика иконки "удалить карточку"
        const card = buttonDeleteCard.closest('.element');
        card.remove();
    });

    const imageCard = cardElement.querySelector('.element__image'); // поучить фотографию из карточки
    imageCard.addEventListener('click', function () {  // слушатель клика при нажатии на фото из карточки
        openPopup(popupImage);
        receivingData(event);
    });

    return cardElement;
}

function addCard(nameImage, linkImage) {
    elementsSection.prepend(createCard(nameImage, linkImage));
}

// слушатель на форму по submit, при клике на "Создать" загружаем значения из полей формы

formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const name = formCard.elements['name-card'];  //получить инпуты формы
    const link = formCard.elements['img-link'];

    addCard(name.value, link.value);

    name.value = '';
    link.value = '';

    closePopup(popupCards);
});

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

function addCardList(cardList) {  // функция по добавлению карточек из массива
    cardList.forEach(function (item) {
        addCard(item['name'], item['link']);
    });
}

addCardList(initialCards); // Вызов функции

const popupImage = document.querySelector('.page__popup-image');  // получить popup с увеличенной фотографией
const popupImageOpened = popupImage.querySelector('.popup__image');  // получить popup с большой фотографией
const spanPopupImage = popupImage.querySelector('.popup__image-span');  // получить подпись к большой фотографии

// функцией получаем src и название из карточки

function receivingData(event) {
    const imageCard = event.target;   // фото внутри карточки
    const element = event.target.closest('.element');  // поднимаемся выше до родителя
    const titleImage = element.querySelector('.element__heading') // выбираем ребенка - название фотографии
    popupImageOpened.src = imageCard.src;  // подставляем значения: путь к фотографии
    spanPopupImage.textContent = titleImage.textContent; // и её название
}

const buttonClosePopupImage = popupImage.querySelector('.popup__close-icon'); // получаем иконку "закрыть" popup с большой фотографией

buttonClosePopupImage.addEventListener('click', function () {  // закрытие popup-фотографии при клике на икоку "закрыть
    closePopup(popupImage);
});

popupImage.addEventListener('click', function () {  // слушатель при клике за пределы popup-фотографии
    closePopupClickOverlay(popupImage);
});