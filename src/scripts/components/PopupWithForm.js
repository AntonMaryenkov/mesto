import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, callback }) {
    super(popupSelector);
    this._callback = callback;
    this._submitForm = this._submitForm.bind(this);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this.textLoading = 'Загрузка...';
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._callback(this._getInputValues());
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', this._submitForm
    );

    super.setEventListeners();
  }

  close() {
    this._popupSelector.removeEventListener('submit', this._submitForm);
    super.close();
    this._popupForm.reset();
  }

}

export { PopupWithForm };
