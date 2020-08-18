const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.page__popup-profile');
const closeIcon = popupProfile.querySelector('.popup__close-icon');
const savePopupButton = popupProfile.querySelector('.popup__button');
const profileName = profile.querySelector('.profile__name');
const profileJobs = profile.querySelector('.profile__jobs');
const formElement = popupProfile.querySelector('.popup__container');
const nameInput = formElement.elements['name-profile'];
const jobsInput = formElement.elements['popup-jobs'];

const popupToggle = function () {
    if (!popupProfile.classList.contains('popup_visible')) {
        nameInput.value = profileName.textContent;
        jobsInput.value = profileJobs.textContent;
    }
    popupProfile.classList.toggle('popup_visible');
}
 
const closePopup = function (event) {
    if (event.target !== event.currentTarget) return false;
    popupToggle();
} 

editButton.addEventListener('click', popupToggle);
closeIcon.addEventListener('click', popupToggle);
popupProfile.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobs.textContent = jobsInput.value;
    popupToggle();
}
formElement.addEventListener('submit', formSubmitHandler);

const popupCards = document.querySelector('.page__popup-cards');  // получить popup для добавления карточек

const popupToggleCards = function () {  // функция для открытия/закрытия popup'a для добавления карточек
    popupCards.classList.toggle('popup_visible');
    if (!popupCards.classList.contains('popup_visible')) {
        popupContainerCard.reset();  // сбрасываем значения формы к стандартным
    }
}
 
const openedPopupCards = profile.querySelector('.profile__add-button');  // получить кнопку  открытия popup'a для добавления карточек
const closeIconPopupCards = popupCards.querySelector('.popup__close-icon');  // получить кнопку внутри popup'a для добавления карточек - "закрыть"

openedPopupCards.addEventListener('click', popupToggleCards);  // события при клике на открыть
closeIconPopupCards.addEventListener('click', popupToggleCards); //закрыть popup для добавления карточек

// функция: закрыть(поменять класс) popup'у для добавления карточек, при клике за пределы popup-окна

const closePopupCards = function (event) {
    if (event.target !== event.currentTarget) return false;
    popupToggleCards();
    popupContainerCard.reset();
}

popupCards.addEventListener('click', closePopupCards);  // событие при клике за пределы popup'a

const elementsSection = document.querySelector('.elements'); // получить секцию elements

// функция для загрузки названия и ссылки на фото для новой карточки

function addCard(nameImage, linkImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
        
    cardElement.querySelector('.element__heading').textContent = nameImage;
    cardElement.querySelector('.element__image').src = linkImage;
    cardElement.querySelector('.element__image').alt = nameImage;
            
    elementsSection.prepend(cardElement);

    popupToggleCards();
}

const popupContainerCard = document.querySelector('.popup__container_card'); // получить форму для загрузки карточек
const saveButtonPopupCard = popupCards.querySelector('.popup__button') // получить кнопку "Создать" в popup'e для добавления карточек

// слушатель на форму по submit, при клике на "Создать" загружаем значения из полей формы

popupContainerCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const popupContainerCards = popupCards.querySelector('.popup__container'); // форма
    const name = popupContainerCards.elements['name-card'];  //получить инпуты формы
    const link = popupContainerCards.elements['img-link'];
  
    addCard(name.value, link.value);
    
    name.value = '';
    link.value = '';
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

// пробегаем по  массиву initialCards и добавляем карточкм

initialCards.forEach(function (item) {
    addCard(item['name'], item['link']);
});

const popupImage = document.querySelector('.page__popup-image');  // получить popup с увеличенной фотографией
const imageButton = elementsSection.querySelector('.element__image');  // получить фото внутри карточки
const popupImageOpened = popupImage.querySelector('.popup__image');  // получить popup с большой фотографией
const spanPopupImage = popupImage.querySelector('.popup__image-span');  // получить подпись к большой фотографии

// функцией получаем src и название из карточки

function receivingData (event) {
    const imageCard = event.target;   // фото внутри карточки
    const element = event.target.closest('.element');  // поднимаемся выше до родителя
    const titleImage = element.querySelector('.element__heading') // выбираем ребенка - название фотографии
    popupImageOpened.src = imageCard.src;  // подставляем значения: путь к фотографии
    spanPopupImage.textContent = titleImage.textContent; // и её название
}

//  обработчик на клик

document.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('element__delete-icon')) {  // удалить карточку
        const сard = target.closest('.element');

        сard.remove();
    }

    if (target.classList.contains('element__like')) {  // поставить/убрать лайк
        target.classList.toggle('element__like_active');
    }

    if (target.classList.contains('element__image')) {  // открыть popup-фотографию
        popupImage.classList.toggle('popup_visible');
        receivingData(event);
    }
})

const closedPopupImage = popupImage.querySelector('.popup__close-icon'); // получаем иконку "закрыть" popup с большой фотографией

const popupImageToggle = function () {             // фунция смены класса для popup'a-фотографии
    popupImage.classList.toggle('popup_visible');
}

closedPopupImage.addEventListener('click', popupImageToggle);  // закрытие popup-фотографии при клике на икоку "закрыть

const closeImagePopup = function (event) {                    // функция - закрываем popup-фотографию при клике за его пределы 
    if (event.target !== event.currentTarget) return false;
    popupImageToggle();
}

popupImage.addEventListener('click', closeImagePopup); // событие при клике за пределы popup-фотографии