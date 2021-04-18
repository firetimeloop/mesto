export default class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._nameElement= document.querySelector(nameSelector);
    this._bioElement= document.querySelector(bioSelector);
  }

  getUserInfo(){
    const userData = {};
    userData.name = this._nameElement.textContent;
    userData.bio = this._bioElement.textContent;
    return userData;
  }

  setUserInfo(newName, newBio){
    this._nameElement.textContent = newName;
    this._bioElement.textContent = newBio;
  }
}
