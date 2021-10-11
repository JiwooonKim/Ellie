'use strict';

/*
scrollIntoView(): 이 메소드는  scrollIntoView()가 호출된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤 한다.
*/

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
  //스크롤링 될 때 메뉴 열리는 거 없어짐
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});


//Navbar toggle button for mobile screen 
const navbarToggleBtn = document.querySelector('.navbar__toggleBtn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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

//1. 모든 섹션 요소들과 아이템들을 가지고 온다
//2. InterSectionObserver를 이용해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];

//map: 배열을 빙글빙글 돌면서 새로운 것으로 변환할 수 있는 API
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
  document.querySelector(`[data-link="${id}"]`));
console.log(sections);
console.log(navItems);

let selectedNavIndex = 0;  //다음에 선택되야하는 인덱스 저장
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

//scroll
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  //!arrowup 버튼 눌렀을 때 nav active 되지 않는 오류 해결
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    //빠져나갈 때
    //! entry.intersectionRatio > 0 은 화면 시작에서 testimonials가 active 되어 있기때문
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      //아래로 스크롤 되어 페이지가 위로 올라감
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

console.log(Math.round(window.scrollY + window.innerHeight));
console.log(document.body.clientHeight);

window.addEventListener('wheel', () => {
  //scrollY가 제일 위라면
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } 
  //scroll이 제일 밑에 도달했다면
  else if (
    //scrollHeihgt clientHeight 차이 공부하기
    Math.round(window.scrollY + window.innerHeight) >= document.body.scrollHeight
    ) {
      //배열의 마지막 인덱스를 지정
      selectedNavIndex = navItems.length - 1;
  }
  //selectedNavItem 함수에 선택된 navItems를 전달해줌.
  selectNavItem(navItems[selectedNavIndex]);
})

