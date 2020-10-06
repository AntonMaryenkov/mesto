import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageText = this._popupSelector.querySelector('.popup__image-span');
  }
  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageText.textContent = name;
    super.open();
  }
}

export { PopupWithImage };
