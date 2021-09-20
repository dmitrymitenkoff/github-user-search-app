const icon = document.querySelector('.mode-icon');
const mode = document.querySelector('.mode');
const themeSwitcher = document.querySelector('.theme-switcher');

// Toggle between "Light" and "Dark" theme names
function swapThemeText() {
  if (mode.innerHTML === 'Light') {
    mode.innerHTML = 'Dark';
  } else {
    mode.innerHTML = 'Light';
  }
}

// Toggle between theme icons
function toggleIcons() {
  document.querySelector('.sun').classList.toggle('hidden');
  document.querySelector('.moon').classList.toggle('hidden');
}

// Applies dark theme CSS styles to all elements that require changes
function activateDarkTheme() {
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

// Changes the theme, text and icons as per user click-action on the theme switcher div
function toggleDarkMode() {
  swapThemeText();
  toggleIcons();
  activateDarkTheme();
}

// EVENT LISTENERS
themeSwitcher.addEventListener('click', toggleDarkMode);
