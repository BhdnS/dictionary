import moon from '../../images/theme/moon.svg';
import sun from '../../images/theme/sun.svg';
import soundBlack from '../../images/sound-black-50.png';
import soundWhite from '../../images/sound-white-50.png';

export default class Theme {
  constructor() {
    this.img = document.querySelector('#theme');
    this.title = document.querySelectorAll('.title');
    this.text = document.querySelectorAll('.text');
    this.element = document.querySelectorAll('.element');
    this.wrapper = document.querySelector('.wrapper');
    this.sound = document.querySelector('#img');
  }

  clickTheme() {
    this.img.addEventListener('click', () => {
      if (this.img.classList.contains('sun')) {
        this.#moonTheme();
        localStorage.setItem('theme', 'light');
      } else if (this.img.classList.contains('black')) {
        this.#sunTheme();
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  loadThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.#sunTheme();
    } else {
      this.#moonTheme();
    }
  }

  #sunTheme() {
    this.wrapper.classList.remove('black__background');
    this.img.classList.remove('black');
    this.img.classList.add('sun');
    this.title.forEach((e) => {
      e.classList.remove('yellow');
    });
    this.element.forEach((e) => {
      e.classList.remove('white');
    });
    this.text.forEach((e) => {
      e.classList.remove('white');
    });
    this.img.src = sun;
    this.sound.src = soundBlack;
  }

  #moonTheme() {
    this.wrapper.classList.add('black__background');
    this.img.classList.add('black');
    this.img.classList.remove('sun');
    this.title.forEach((e) => {
      e.classList.add('yellow');
    });
    this.element.forEach((e) => {
      e.classList.add('white');
    });
    this.text.forEach((e) => {
      e.classList.add('white');
    });
    this.img.src = moon;
    this.sound.src = soundWhite;
  }
}
