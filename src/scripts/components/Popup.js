class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _closePopupClickOverlay(event) {  // функция закрытия формы при клике на оверлей
    if (event.target !== event.currentTarget) return false;
    this.close();
  }

  _handleEscClose(e) {
    if (e.keyCode == 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-icon').addEventListener('click', () => {   // слушатель на клик на кнопку "закрыть попап"
      this.close();
    });
    this._popupSelector.addEventListener('click', (event) => {  // слушатель на клик за пределы попап формы
      this._closePopupClickOverlay(event);
    });
  }
}

export { Popup };
