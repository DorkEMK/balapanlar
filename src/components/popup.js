import { modalConfig } from '../utils/constants.js';
export {
  openPopup,
  closePopupByOverlayAndIcon
};

const bodyElem = document.querySelector(modalConfig.popupPageBodySelector);

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector(modalConfig.activeModalSelector);
    if (activePopup) {
      closePopup(activePopup);
      bodyElem.classList.toggle(modalConfig.pageUnscrollClass);
    }
  }
}

function openPopup(popup) {
  popup.classList.add(modalConfig.activeModalClass);
  document.addEventListener('keydown', closePopupByEsc);
  bodyElem.classList.toggle(modalConfig.pageUnscrollClass);
}

function closePopup(popup) {
  popup.classList.remove(modalConfig.activeModalClass);
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByOverlayAndIcon (evt) {
  if (evt.target.classList.contains(modalConfig.closeBtnSelector) ||
    evt.target.classList.contains(modalConfig.activeModalClass)) 
      { 
        closePopup(evt.target.closest(modalConfig.modalSelector));
        bodyElem.classList.toggle(modalConfig.pageUnscrollClass);
      }
}