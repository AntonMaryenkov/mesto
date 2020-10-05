class Card {
  constructor({ data, handleCardClick }, template) {
    this._data = data;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = this._template
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
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector('.element__heading').textContent = this._data.name;
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
  _openPopup(event) {
    this._handleCardClick(event);
  }
  // Метод со слушателями на клик на лайк, иконку удалить и клик на картинку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', (event) => {
      this._openPopup(event);
    });
  }
}

export { Card };
