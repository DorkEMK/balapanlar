const container = document.querySelector(".principles__scroll-container");
const scrollElements = Array.from(document.querySelectorAll('.principles__element'));
const scrollElement = document.querySelector('.principles__element');

const modalConfig = {
  modalSelector: '.popup',
  closeBtnSelector: 'popup__close-button',
  activeModalClass: 'popup_is-opened',
  activeModalSelector: '.popup_is-opened',
  popupPageBodySelector: '.page',
  pageUnscrollClass: 'page__unscrollable'
}

export { container, scrollElements, scrollElement, modalConfig }