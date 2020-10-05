import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(event) {
    const imageCard = event.target;   // фото внутри карточки
    const element = event.target.closest('.element');  // поднимаемся выше до родителя
    const titleImage = element.querySelector('.element__heading') // выбираем ребенка - название фотографии
    this._popupSelector.querySelector('.popup__image').src = imageCard.src;  // подставляем значения: путь к фотографии
    this._popupSelector.querySelector('.popup__image').alt = imageCard.alt;
    this._popupSelector.querySelector('.popup__image-span').textContent = titleImage.textContent;
    // и её название
    super.open();
  }
}

export { PopupWithImage };
