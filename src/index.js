const icon = document.querySelector('.mode-icon');
const mode = document.querySelector('.mode');
const toggles = document.querySelector('.toggles');

function swapThemeModeText() {
  if (mode.innerHTML === 'Light') {
    mode.innerHTML = 'Dark';
    icon.src = '../assets/icon-moon.svg';
  } else {
    mode.innerHTML = 'Light';
    icon.src = '../assets/icon-sun.svg';
  }
}

function toggleDarkMode() {
  swapThemeModeText();

  const elements = [
    document.querySelector('body'),
    document.querySelector('header'),
    document.querySelector('.search'),
    document.querySelector('.card'),
  ];
  elements.forEach(element => {
    element.classList.toggle('dark');
  });
}

toggles.addEventListener('click', toggleDarkMode);
