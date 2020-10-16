import { Popup } from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor({ popupSelector, callback }) {
    super(popupSelector);
    this.callback = callback;
    this.textLoading = 'Удаление...';
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__button').addEventListener('click', () => {
      this.callback();
    }
    );

    super.setEventListeners();
  }
}

export { PopupWithSubmit };
