// Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // добавляем класс ошибки импуту
    inputElement.classList.add(inputErrorClass);
    // даем значение сообщению об ошибке
    errorElement.textContent = errorMessage;
    // добавляем класс(делаем видимым) сообщение об ошибке
    errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля принимает formElement и inputElement, а не берёт их из внешней области видимости
function isValid(formElement, inputElement, {inputErrorClass, errorClass}) {
    if (!inputElement.validity.valid) {
        // если валидность не проходит, покажем ошибку. showInputError получает параметром форму, в которой находится проверяемое поле, само это поле и validationMessage
        showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
    } else {
        // Если проходит, скроем. hideInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
    }
};

// Функция принимает массив полей
function hasInvalidInput(inputList) {
    // проходим массиву 
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = 'disabled';
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

function setEventListener(formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    // Находим все поля внутри формы, делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    toggleButtonState(inputList, buttonElement, rest);

    // Обойдём все элементы полученной коллекции
    inputList.forEach(function (inputElement) {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', function () {
            // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
            isValid(formElement, inputElement, rest)

            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

function enableValidation({formSelector, ...rest}) {
    // Найдём все формы с указанным классом в DOM, делаем из них массив
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Переберём полученную коллекцию
    formList.forEach(function (formElement) {
        formElement.addEventListener('submit', function (evt) {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
        setEventListener(formElement, rest);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });