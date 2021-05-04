export default class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector, userId) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = userId;
  }

  getUserInfo(){
    const userData = {};
    userData.name = this._nameElement.textContent;
    userData.bio = this._bioElement.textContent;
    userData.id = this._userId;
    return userData;
  }

  setUserInfo(newName, newBio){
    this._nameElement.textContent = newName;
    this._bioElement.textContent = newBio;
  }

  setUserAvatar(newAvatar){
    this._avatarElement.src = newAvatar;
  }

  getUserId(){
    return this._userId;
  }
}
