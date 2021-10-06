'use strict';

/*
scrollIntoView(): 이 메소드는  scrollIntoView()가 호출된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤 한다.
*/

//scroll
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}


//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll',() => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=> {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  } 
  scrollIntoView(link);
});

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click',() => {
  scrollIntoView('#contact');
})

//Make home slowly fade to transparent as the widow scrolls down
const home = document.querySelector('.home__content');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});


//Show scroll down when click arrow button
const arrowUpBtn = document.querySelector('#arrowUpBtn');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight /  2){
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
});

//Handle click on the "arrow up" button
arrowUpBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});




