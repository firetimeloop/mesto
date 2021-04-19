const KarachaevoImage = new URL('../../images/place-Karachaevsk.jpg', import.meta.url);
const ElbrusImage = new URL('../../images/place-Elbrus.png', import.meta.url);
const DombayImage = new URL('../../images/place-Dombuy.png', import.meta.url);
const BruceImage = new URL('../../images/place-Bryce-canyon.jpg', import.meta.url);
const FanshipanImage = new URL('../../images/place-Fanshipan.jpg', import.meta.url);
const GoldenGateImage = new URL('../../images/place-Golden-gate.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Карачаево-черкесия',
    link: KarachaevoImage
  },
  {
    name: 'Гора Эльбрус',
    link: ElbrusImage
  },
  {
    name: 'Домбай',
    link: DombayImage
  },
  {
    name: 'Брайс-каньон',
    link: BruceImage
  },
  {
    name: 'Фаншипан',
    link: FanshipanImage
  },
  {
    name: 'Золотые ворота',
    link: GoldenGateImage
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const escKey = 'Escape';
