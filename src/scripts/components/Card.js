class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, template) {
    this._data = data;
    this._id = data._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

  generateCard(id, likes, likeId) { // передаем в аргументы id пользователя, лайки карточки, функцию поиска лайков пользователя
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
    this._dataOnwer = this._data.owner;
    this._cardImage.id = this._id;
    this._likeCounter = this._element.querySelector('.element__like-quantity');
    this._likeCounter.textContent = likes.length;
    if (this._dataOnwer._id === id) {
      this._buttonDelete.classList.add('element__delete-icon_active');
    }
    if (likeId === true) {
      this._buttonLike.classList.add('element__like_active')
    }
    // Добавим слушатель
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  checkClass() {
    if (this._buttonLike.classList.contains('element__like_active')) {
      return true;
    }
  }
  // Метод поставить/убрать лайк
  toggleLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  likedCard(likes) {
    this._likeCounter.textContent = likes.length;
  }
  // Метод удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  // Метод отккрыть попап с большой картинкой
  _openPopup() {
    this._handleCardClick(this._data);
    //this._handleCardClick(event);
  }
  // Метод со слушателями на клик на лайк, иконку удалить и клик на картинку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
      //this.toggleLike()
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteIconClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._openPopup();
    });
  }
}

export { Card };
