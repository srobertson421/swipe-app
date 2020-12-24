import Swiper, { SwiperPluginLazyload } from 'tiny-swiper';

Swiper.use([ SwiperPluginLazyload ]);

const routes = [
  '/',
  '/profile',
  '/settings'
];

function getSlideIndexFromHash() {
  const path = window.location.hash.split('#')[1];

  if(!path) {
    window.location.hash = '#/';
    return 0;
  }

  const index = routes.findIndex(route => route === path);

  if(!index) {
    window.location.hash = '#/';
    return 0;
  }

  return index;
}

const swiper = new Swiper('#app', {
  loop: true,
  initialSlide: getSlideIndexFromHash()
});

function createImage(url) {
  const newImg = new Image();
  newImg.src = url;
  return newImg;
}

const navLinkEls = document.querySelectorAll('.nav-link');
const navIcons = [
  createImage('https://icongr.am/entypo/home.svg?size=35&color=FFFFFF'),
  createImage('https://icongr.am/entypo/user.svg?size=35&color=FFFFFF'),
  createImage('https://icongr.am/entypo/cog.svg?size=35&color=FFFFFF')
];
const activeNavIcons = [
  createImage('https://icongr.am/entypo/home.svg?size=35&color=7FFFD4'),
  createImage('https://icongr.am/entypo/user.svg?size=35&color=8A2BE2'),
  createImage('https://icongr.am/entypo/cog.svg?size=35&color=FF7F50')
];

navLinkEls.forEach((el, index) => {
  el.addEventListener('click', () => {
    swiper.slideTo(index);
  });
});

function setActiveView(currentView) {
  navLinkEls.forEach((el, index) => {
    el.classList.remove('active');
    el.firstElementChild.replaceWith(navIcons[index]);
  });

  navLinkEls[currentView].classList.add('active');
  navLinkEls[currentView].firstElementChild.replaceWith(activeNavIcons[currentView]);
}

setActiveView(swiper.state.index);

swiper.on('before-slide', (currentIndex, state, nextIndex) => {
  window.location.hash = `#${routes[nextIndex]}`
  setActiveView(nextIndex);
});