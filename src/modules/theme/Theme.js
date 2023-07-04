import moon from '../../images/theme/moon.svg';
import sun from '../../images/theme/sun.svg';
import soundBlack from '../../images/sound-black-50.png';
import soundWhite from '../../images/sound-white-50.png';

export default class Theme {
  constructor(params) {
    this.img = params.img;
    this.title = params.title;
    this.text = params.text;
    this.element = params.element;
    this.wrapper = params.wrapper;
    this.sound = params.sound;
  }

  clickTheme() {
    this.img.addEventListener('click', () => {
      if (this.img.classList.contains('sun')) {
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
        localStorage.setItem('theme', 'light');
      } else if (this.img.classList.contains('black')) {
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
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  loadThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
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
    } else {
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
}
