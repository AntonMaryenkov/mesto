class FormValidator {
  constructor(formConfig, form) {
    this._formConfig = formConfig;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage,) {
    // Находим элемент ошибки внутри метода
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    // добавляем класс ошибки импуту
    inputElement.classList.add(this._formConfig.inputErrorClass);
    // даем значение сообщению об ошибке
    this._errorElement.textContent = errorMessage;
    // добавляем класс(делаем видимым) сообщение об ошибке
    this._errorElement.classList.add(this._formConfig.errorClass);
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formConfig.inputErrorClass);
    this._errorElement.classList.remove(this._formConfig.errorClass);
    this._errorElement.textContent = '';
  }

  // Метод, который проверяет валидность поля, принимает formElement и inputElement, а не берёт их из внешней области видимости
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // если валидность не проходит, покажем ошибку. showInputError получает параметром форму, в которой находится проверяемое поле, само это поле и validationMessage
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем. hideInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  }

  // Метод принимает массив полей
  _hasInvalidInput(inputList) {
    // проходим массиву
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  openFormIsValid(popup) { // функция убирает модификаторы об ошибке при валидности полей формы
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(function (input) {
      if (input.validity.valid) {
        input.classList.remove('popup__input_type_error');
        const erorrSpan = popup.querySelector(`#${input.id}-error`);
        erorrSpan.classList.remove('popup__error_visible');
        popup.querySelector('.popup__button').classList.remove('popup__button_disabled');
      }
    });
  }

  removeErorr(popup) { // функция сброса ошибок валидации
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(function (input) {
      input.classList.remove('popup__input_type_error');
    });
    popup.querySelector('.popup__button').classList.add('popup__button_disabled');
    const erorrSpanList = Array.from(popup.querySelectorAll('.popup__error'));
    erorrSpanList.forEach(function (erorrSpan) {
      erorrSpan.classList.remove('popup__error_visible');
    });
  }

  _setEventListener() {
    this._buttonElement = this._form.querySelector(this._formConfig.submitButtonSelector);
    // Находим все поля внутри формы, делаем из них массив
    const inputList = Array.from(this._form.querySelectorAll(this._formConfig.inputSelector));
    this._toggleButtonState(inputList);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        this._toggleButtonState(inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      // У формы отменим стандартное поведение
      evt.preventDefault();
      // Для формы вызовем функцию setEventListeners, передав ей элемент формы
    });
    this._setEventListener();
  };
}

export { FormValidator };
