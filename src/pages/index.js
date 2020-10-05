import './index.css';
import { formConfig, initialCards, profilePopup, cardPopup, imagePopup, editButton, cardPopupOpenButton, profileName, profileJobs, profileForm, nameInput, jobsInput, cardForm, elementsSection, cardTemplate } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Popup } from '../scripts/components/Popup';
import { UserInfo } from '../scripts/components/UserInfo';

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profilFormValidator = new FormValidator(formConfig, profileForm);
cardFormValidator.enableValidation();
profilFormValidator.enableValidation();

const info = new UserInfo(profileName, profileJobs);

const popupUser = new Popup(profilePopup);
popupUser.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: function (data) {
    const card = new Card({
      data: data,
      handleCardClick: function (event) {
        const popupImage = new PopupWithImage(imagePopup);
        popupImage.open(event);
        popupImage.setEventListeners();
      }
    }, cardTemplate);
    const cardElement = card.generateCard();
    this.addItem(cardElement);
  }
}, elementsSection);
cardList.renderItems();

editButton.addEventListener('click', function () {  // слушатель на клик на кнопку "редактировать профиль"
  const userData = info.getUserInfo();

  nameInput.value = userData.name;
  jobsInput.value = userData.info;

  popupUser.open();

  profilFormValidator.openFormIsValid(profilePopup);
});

profilePopup.addEventListener('submit', function (evt) { // слушатель сабмита формы профиля
  evt.preventDefault();
  info.setUserInfo(nameInput, jobsInput);
  popupUser.close();
});

cardPopupOpenButton.addEventListener('click', function () {  // слушатель на клик на кнопку открыть форму для добавления карточек
  const popupForm = new PopupWithForm({
    popupSelector: cardPopup,
    callback: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: function (event) {
          const popupImage = new PopupWithImage(imagePopup);
          popupImage.open(event);
          popupImage.setEventListeners();
        }
      }, cardTemplate);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }

  });
  popupForm.open();
  popupForm.setEventListeners();

  cardFormValidator.removeErorr(cardPopup);
});
