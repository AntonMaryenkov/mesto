import { PopupWithForm } from './PopupWithForm.js';

class PopupEditAvatar extends PopupWithForm {
  constructor({ popupSelector, callback }) {
    super({ popupSelector, callback });
    this._buttonSubmit = this._popupSelector.querySelector('.popup__button');
    this.textLoading = 'Сохранение...';
  }

  _addAvatar() { () => this._callback() }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', () => this._addAvatar());

    super.setEventListeners();
  }
}

export { PopupEditAvatar };
