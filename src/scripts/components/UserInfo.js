class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameSelectror = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    this._userValues = {
      name: this._nameSelectror.textContent,
      info: this._infoSelector.textContent
    };

    return this._userValues;
  }

  setUserInfo(name, info) {
    this._nameSelectror.textContent = name;
    this._infoSelector.textContent = info;
  }
}

export { UserInfo };
