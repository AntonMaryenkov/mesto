class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
  // метод загрузки карточкек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // метод загрузки новой карточки на сервер
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // метод получения информации о рользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // метод загрузки аватара на сервер
  addAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // метод загрузки информации о пользователе
  addUserInfo(nameUser, infoUser) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameUser,
        about: infoUser
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // метод удаления карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // ставим лайк
  liked(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
  // убираем лайк
  disliked(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Произошла ошибка");
    });
  }
}


export { Api };
