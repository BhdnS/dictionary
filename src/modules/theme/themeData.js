import Theme from './Theme';

const themeData = new Theme({
  img: document.querySelector('#theme'),
  title: document.querySelectorAll('.title'),
  text: document.querySelectorAll('.text'),
  element: document.querySelectorAll('.element'),
  wrapper: document.querySelector('.wrapper'),
  sound: document.querySelector('#img'),
});

themeData.clickTheme();
themeData.loadThemeFromLocalStorage();
