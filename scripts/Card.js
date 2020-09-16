import { openPopup, receivingData, popupImage } from './index.js';

class Card {
    constructor(heading, image) {
        this._image = image;
        this._heading = heading;
    }

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
          const cardElement = document
          .querySelector('#card-template')
          .content
          .querySelector('.element')
          .cloneNode(true);
          
        // вернём DOM-элемент карточки
          return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        // Добавим данные
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__heading').textContent = this._heading;
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonDelete = this._element.querySelector('.element__delete-icon');
        // Добавим слушатель
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
      }
    // Метод поставить/убрать лайк
    _handleLikeClick() {
        this._buttonLike.classList.toggle('element__like_active');
    }
    // Метод удаления карточки
    _deleteCard() {
        this._element.remove();
    }
    // Метод отккрыть попап с большой картинкой
    _openPopup() {
        openPopup(popupImage);
        receivingData(event);
    }
    // Метод со слушателями на клик на лайк, иконку удалить и клик на картинку
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick();
            });
        this._buttonDelete.addEventListener('click', () => {
            this._deleteCard();
            });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopup();
            });
    }
}

export { Card };