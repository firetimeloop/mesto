export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _genericMethod(urlSuffix, method, body=null){
    return fetch(`${this.baseUrl}/${urlSuffix}`, {
      method: method,
      headers: this.headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getUserInfo() {
    return await this._genericMethod('users/me', 'GET');
  }

  async getInitialCards() {
    return await this._genericMethod('cards', 'GET');
  }

  editUserInfo(name, about){
    const body = JSON.stringify({
      name: name,
      about: about
    });
    return this._genericMethod('users/me', 'PATCH', body);
  }

  postCard(name, link){
    const body = JSON.stringify({
      name: name,
      link: link
    });
    return this._genericMethod('cards', 'POST', body);
  }

  deleteCard(idCard){
    return this._genericMethod(`cards/${idCard}`, 'DELETE');
  }

  unlikeCard(idCard){
    return this._genericMethod(`cards/likes/${idCard}`, 'DELETE');
  }

  likeCard(idCard){
    return this._genericMethod(`cards/likes/${idCard}`, 'PUT');
  }

  editAvatar(avatar){
    const body = JSON.stringify({
      avatar: avatar
    });
    return this._genericMethod('users/me/avatar', 'PATCH', body);
  }

  // другие методы работы с API
}
