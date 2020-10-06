import './index.css';
import { formConfig, initialCards, profilePopup, cardPopup, imagePopup, editButton, cardPopupOpenButton, profileName, profileJobs, profileForm, nameInput, jobsInput, cardForm, elementsSection, cardTemplate } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo';

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profilFormValidator = new FormValidator(formConfig, profileForm);
cardFormValidator.enableValidation();
profilFormValidator.enableValidation();

const info = new UserInfo(profileName, profileJobs);

const popupImage = new PopupWithImage(imagePopup);

function createCard(data) {

  const card = new Card({
    data: data,
    handleCardClick: function (data) {
      popupImage.open(data);
      popupImage.setEventListeners();
    }
  }, cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: function (data) {
    const cardElement = createCard(data);
    this.addItem(cardElement, initialCards);
  }
}, elementsSection);
cardList.renderItems();

editButton.addEventListener('click', function () {  // слушатель на клик на кнопку "редактировать профиль"
  const userData = info.getUserInfo();
  nameInput.value = userData.name;
  jobsInput.value = userData.info;

  const popupForm = new PopupWithForm({
    popupSelector: profilePopup,
    callback: (data) => {
      info.setUserInfo(data.user, data.info);
    }
  });
  popupForm.open();
  popupForm.setEventListeners();

  profilFormValidator.openFormIsValid(profilePopup);
});

cardPopupOpenButton.addEventListener('click', function () {  // слушатель на клик на кнопку открыть форму для добавления карточек
  const popupForm = new PopupWithForm({
    popupSelector: cardPopup,
    callback: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    }
  });
  popupForm.open();
  popupForm.setEventListeners();

  cardFormValidator.removeErorr(cardPopup);
});
