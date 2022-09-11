import './index.css';
import { container, scrollElements, scrollElement, modalConfig } from '../utils/constants.js'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openPopup, closePopupByOverlayAndIcon } from '../components/popup';

gsap.registerPlugin(ScrollTrigger);

const mMedia = gsap.matchMedia()
mMedia.add('(min-width: 1025px)'
	, () => {
		gsap.to(scrollElements, {
			xPercent: -100 * (scrollElements.length - 1),
			ease: "none",
			scrollTrigger: {
				trigger: '.principles',
				pin: true,
				pinType: 'fixed',
				start: 'top top',
				scrub: 0.5,
				onToggle: () => {
					if (innerWidth >= 1440) {
						gsap.to(
							container, {
							ease: "none",
							delay: 0,
							duration: 0,
							overflow: 'visible'
						})
						gsap.to(
							scrollElements, {
							ease: 'none',
							delay: 0,
							duration: 0,
							backgroundColor: '#AE46FF',
						})
					}
				},
				onEnter: () => {
					gsap.to('.header__scroll', {
						scale: 0.95,
						borderRadius: '66px',
						ease: "none",
						delay: 0.01,
						duration: 0.01,
					})
					gsap.to(
						'.principles__background', {
						ease: 'none',
						delay: 0,
						duration: 0,
						borderRadius: '0',
					})
				},
				onEnterBack: () => {
					gsap.to('.header__scroll', {
						scale: 0.95,
						borderRadius: '66px',
						ease: "none",
						delay: 0.01,
						duration: 0.01,
					})
					gsap.to(
						'.principles__background', {
						ease: 'none',
						delay: 0,
						duration: 1,
						borderRadius: '0',
					})
				},
				onLeave: () => {
					gsap.to('.header__scroll', {
						scale: 1,
						borderRadius: '',
						ease: "none",
						delay: 0.01,
						duration: 0.01,
					})
					gsap.to(
						'.principles__background', {
						ease: 'none',
						delay: 0,
						duration: 1,
						borderRadius: '60px',
					})

					gsap.to(
						container, {
						ease: 'none',
						delay: 0,
						duration: 0.1,
						overflow: 'hidden'
					})
				},
				onLeaveBack: () => {
					gsap.to('.header__scroll', {
						scale: 1,
						borderRadius: '',
						ease: "none",
						delay: 0.01,
						duration: 0.01,
					})
					gsap.to(
						'.principles__background', {
						ease: 'none',
						delay: 0,
						duration: 0,
						borderRadius: '60px'
					})
					gsap.to(
						container, {
						ease: 'none',
						delay: 0,
						duration: 0.1,
						overflow: 'hidden'
					})
				},
				end: () => `+=${container.offsetWidth * (scrollElements.length - 1)}`
			}
		})
	}
)


// popup
const courseReviewBtn = document.querySelector('.course__review-button');
const courseReviewPopup = document.querySelector('.popup.course');

const partnerLwbLogo = document.querySelector('#partners__logo_lwb');
const partnerOgLogo = document.querySelector('#partners__logo_og');
const partnerHbLogo = document.querySelector('#partners__logo_hb');

const partnerLwbPopup = document.querySelector('#partners__logo_lwb-popup');
const partnerOgPopup = document.querySelector('#partners__logo_og-popup');
const partnerHbPopup = document.querySelector('#partners__logo_hb-popup');

partnerLwbLogo.addEventListener('click', () => { openPopup(partnerLwbPopup) });
partnerOgLogo.addEventListener('click', () => { openPopup(partnerOgPopup) });
partnerHbLogo.addEventListener('click', () => { openPopup(partnerHbPopup) });

const popups = document.querySelectorAll(modalConfig.modalSelector);

courseReviewBtn.addEventListener('click', () => {
	openPopup(courseReviewPopup);
});

popups.forEach((popup) => {
	popup.addEventListener('click', closePopupByOverlayAndIcon);
});

window.addEventListener('wheel', (e) => {
	if (e.ctrlKey) {
		e.preventDefault()
		return false
	}
}, { passive: false })


// header menu

const headerStart = document.querySelector('.header__start');
const headerScroll = document.querySelector('.header__scroll');
const logoScroll = headerScroll.querySelector('.header__scroll-logo');
const buttonMenuStart = headerStart.querySelector('.header__menu');
const buttonMenuScroll = headerScroll.querySelector('.header__menu');
const headerMobile = document.querySelector('.header__mobile');
const headerMobileLinks = headerMobile.querySelectorAll('.header__mobile-link');

const menuCloseEsc = (evt) => {
	if (evt.key == "Escape") {
		closeMenuMobile();
	};
};


let last_known_scroll_position = 0;

function addScrollListener() {
	window.addEventListener('scroll', function (e) {
		if (isScrollFromTop()) {
			headerStart.style.opacity = '0';
			headerScroll.style.top = '0';
		} if (isScrollToTop()) {
			headerStart.style.opacity = '1';
			headerScroll.style.top = '-100%';
		}
		last_known_scroll_position = window.scrollY;

		closeMenuMobile();
	})
}
addScrollListener();

function isScrollToTop() {
	return last_known_scroll_position !== 0 && window.scrollY == 0;
}

function isScrollFromTop() {
	return last_known_scroll_position == 0 && window.scrollY !== 0;
}

function isHeaderMobileOpen() {
	if (parseInt(headerMobile.style.top) == 0) {
		return true
	} else {
		return false
	}
};

buttonMenuStart.addEventListener('click', (e) => {
	if (!isHeaderMobileOpen()) {
		headerMobile.style.top = 0;
		buttonMenuStart.style.zIndex = 10;
		document.addEventListener('keydown', menuCloseEsc);
		buttonMenuStart.classList.add('header__menu_active');
	} else {
		closeMenuMobile();
	}
})

buttonMenuScroll.addEventListener('click', (e) => {
	if (!isHeaderMobileOpen()) {
		headerMobile.style.top = 0;
		headerScroll.style.zIndex = 10;
		headerScroll.style.backgroundColor = '#ffffff00';
		logoScroll.style.opacity = 0;
		document.addEventListener('keydown', menuCloseEsc);
		buttonMenuScroll.classList.add('header__menu_active');
	} else {
		closeMenuMobile();
	}
})

function closeMenuMobile() {
	headerMobile.style.top = `-${headerMobile.scrollHeight}px`;
	document.removeEventListener('keydown', menuCloseEsc);
	buttonMenuStart.style.zIndex = 3;
	headerScroll.style.zIndex = 3;
	headerScroll.style.backgroundColor = '#ffffff';
	logoScroll.style.opacity = 1;
	buttonMenuStart;
	buttonMenuScroll;
	buttonMenuStart.classList.remove('header__menu_active');
	buttonMenuScroll.classList.remove('header__menu_active')
}

function addListenerToMobileLinks() {
	headerMobileLinks.forEach(
		function addListener(link) {
			link.addEventListener('click', (e) => {
				closeMenuMobile();
			})
		}
	)
}

addListenerToMobileLinks();

function autoHideHeaderMobile() {
	window.addEventListener('resize', (e) => {
		if (headerMobile.style.top !== 0) {
			headerMobile.style.top = `-${headerMobile.scrollHeight}px`;
		}
	});
}

autoHideHeaderMobile();