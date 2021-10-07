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

//Project
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer =  document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  /*e를 받아와서 target안에 있는 dataset 안에 있는 filter 값들을 받아옴*/
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  //만약 filter가 null일 경우 아무것도 하지 않음.
  if(filter == null) {
    return;
  }

  //Remove selection from the previous item the select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');

  //! 버튼 중 알림(span)을 클릭하면 에러가 발생 -> e.target이 span을 가리키기 때문. (slected는 button에 지정되어 있음)
  //클릭된 target의 node name이 BUTTON이면 e.target을 쓰고 아니면 e.target.parentNode를 사용.(span의 parentNode는 button)
  const target = 
  e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;

  target.classList.add('selected');


  projectContainer.classList.add('anime-out');
  
  //setTimeout을 지정하지 않으면 anime-out이 계속 남아있어 opacity가 0으로 유지되어 보이지 않음. opacity가 1로 돌아올 수 있도록 anime-out을 지워야함.

  //setTimeout은 우리가 등록한 함수를 지정한 시간 뒤에 불러주는 메소드
  setTimeout(() => {
    /*
    forEach와 같은 것
    (1) for(let project of projects) {
    }

    (2) for( let i = 0; i < projects.length; i++ ) {
      project = projects[i];
    }
  */
   //project를 배열형태로 받아옴.
  projects.forEach((project) => {
    console.log(project.dataset.type);

    //* 전부 다 거나 클릭한 필터와 데이터 타입이 매칭하면 
    if( filter === '*' || filter === project.dataset.type ) {
      //보여지도록
      project.classList.remove('invisible');
      //해당이 안되면 안보여지도록
    } else {
      project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anime-out');
  }, 300);
  
});



