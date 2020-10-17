import './index.css';
import { formConfig, profilePopup, cardPopup, imagePopup, editButton, cardPopupOpenButton, profileName, profileJobs, profileForm, nameInput, jobsInput, cardForm, elementsSection, cardTemplate, avatarPopup, avatarForm, avatarImg, avatarInput, popupConfirmation, avatarBlock } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo';
import { Api } from '../scripts/components/Api.js';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js';

// функция отображения текста UX при сабмите различных форм
function renderLoading(isLoading, popupSelector, text) {
  const buttonSubmit = popupSelector.querySelector('.popup__button')
  if (isLoading) {
    buttonSubmit.textContent = text;
  } else {
    buttonSubmit.textContent = buttonSubmit.value;
  }
}

// экземпляр класса с информацией о пользователе(имя, о себе)
const info = new UserInfo(profileName, profileJobs);

// экземпляр класса popup'а с большой фотография
const popupImage = new PopupWithImage(imagePopup);

// экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '576b2db1-a969-4c8a-b492-b7d43b9cd61c',
    'content-type': 'application/json',
  }
});

// получаем с сервера информацию о пользователе
const userInfo = api.getUserInfo();
userInfo
  .then((res) => {
    info.setAvatarLink(res.avatar, avatarImg);
    info.setUserInfo(res.name, res.about)

    return res;
  })
  .then((res) => {
    // функция создания карточки
    function createCard(data) {
      // получаем колличество лайков с сервера
      const cardLikes = data.likes;
      // получаем id карточек
      const cardId = data._id;
      // получаем id пользователя
      const userId = res._id;

      // функция поиска своих лайков
      function checkId() {
        const idList = cardLikes.map(function (obj) {
          return obj._id
        })
        const id = idList.some(element => element === userId);
        return id
      }

      // экземпляр класса Card
      const card = new Card({
        data: data,
        // функция при клике на картику
        handleCardClick: function (data) {
          popupImage.open(data);
          popupImage.setEventListeners();
        },
        // функция при клике на лайк
        handleLikeClick: function () {
          if (card.checkClass() !== true) {
            api.liked(cardId)
              .then((res) => {
                const newLikes = res.likes
                card.likedCard(newLikes);
                card.toggleLike();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            api.disliked(cardId)
              .then((res) => {
                const newLikes = res.likes
                card.likedCard(newLikes);
                card.toggleLike();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
        // функция при клике на иконку удалить
        handleDeleteIconClick: function () {
          // экземпляр класса PopupWithSubmit для удаления карточки
          const popupWithSubmit = new PopupWithSubmit({
            popupSelector: popupConfirmation,
            callback: function () {
              // UX
              renderLoading(true, popupConfirmation, this.textLoading);
              // удаляем с сервера
              api.deleteCard(data._id)
                .then(() => {
                  // передаем метод удаления карточки из класса Card
                  card.deleteCard();
                })
                .then(() => {
                  // закрываем попап
                  popupWithSubmit.close();
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  renderLoading(false, popupConfirmation, this.textLoading);
                });
            }
          });
          // слушатель сабмита формы подвержения удаления карточки
          popupWithSubmit.setEventListeners();
          // открыть форму подвержения удаления карточки
          popupWithSubmit.open();
        },
      }, cardTemplate);
      // cобираем карточку, передаем в аргументы id пользователя, лайки карточки, функцию поиска лайков пользователя
      const cardElement = card.generateCard(userId, cardLikes, checkId());

      return cardElement;
    }

    // получить карточки с сервера
    const initialCards = api.getInitialCards();

    initialCards
      .then((data) => {
        const cardList = new Section({
          items: data,
          renderer: function (data) {
            const cardElement = createCard(data);
            // загружаем карточки на страницу
            this.addItem(cardElement, data);
          }
        }, elementsSection);

        cardList.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });

    // экземпляр класса аватар
    const editAvatar = new PopupWithForm({
      popupSelector: avatarPopup,
      callback: function (data) {
        // UX
        renderLoading(true, avatarPopup, this.textLoading);
        api.addAvatar(data.avatar)
          .then((res) => {
            // меняем информацию о пользователе на странице
            info.setAvatarLink(res.avatar, avatarImg);
          })
          .then(() => {
            editAvatar.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoading(false, avatarPopup, this.textLoading);
          });
      }
    });

    // слушатель на клик по аватарке
    avatarBlock.addEventListener('click', function () {
      editAvatar.open();
      avatarInput.value = avatarImg.src;
      editAvatar.setEventListeners();

      avatarFormValidator.openFormIsValid(avatarPopup);
    });

    // слушатель на клик на кнопку "редактировать профиль"
    editButton.addEventListener('click', function () {
      const userData = info.getUserInfo();
      nameInput.value = userData.name;
      jobsInput.value = userData.info;

      const popupForm = new PopupWithForm({
        popupSelector: profilePopup,
        callback: function (data) {
          // UX
          renderLoading(true, profilePopup, this.textLoading);
          // загружаем информацию о пользователе на сервер
          api.addUserInfo(data.user, data.info)
            .then((data) => {
              // меняем информацию о пользователе на странице
              info.setUserInfo(data.name, data.about);
            })
            .then(() => {
              popupForm.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoading(false, profilePopup, this.textLoading);
            });
        }
      });
      popupForm.open();
      popupForm.setEventListeners();

      profilFormValidator.openFormIsValid(profilePopup);
    });
    // слушатель на клик на кнопку открыть форму для добавления карточек
    cardPopupOpenButton.addEventListener('click', function () {
      const popupForm = new PopupWithForm({
        popupSelector: cardPopup,
        callback: function (data) {
          const cardList = new Section({
            items: data,
            renderer: function (data) {
              const cardElement = createCard(data);
              this.addItem(cardElement);
            }
          }, elementsSection);
          // UX
          renderLoading(true, cardPopup, this.textLoading);
          // отправляем на сервер
          api.addCard(data)
            .then((data) => {
              // создаем карточку
              const cardElement = createCard(data);
              // добавляем карточку на страницу
              cardList.addItem(cardElement);
            })
            .then(() => {
              popupForm.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoading(false, cardPopup, this.textLoading);
            });
        }
      });
      popupForm.open();
      popupForm.setEventListeners();

      cardFormValidator.removeErorr(cardPopup);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// валидация
const avatarFormValidator = new FormValidator(formConfig, avatarForm);
const cardFormValidator = new FormValidator(formConfig, cardForm);
const profilFormValidator = new FormValidator(formConfig, profileForm);
avatarFormValidator.enableValidation();
cardFormValidator.enableValidation();
profilFormValidator.enableValidation();




