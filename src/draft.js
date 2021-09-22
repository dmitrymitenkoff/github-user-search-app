const toggle = document.querySelector('.toggle');
const toggleText = document.querySelector('.toggle__text');
const elements = document.querySelectorAll('.theme');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
let theme;

// If the current theme in local storage is dark
// if (currentTheme == 'dark') {
//   elements.forEach(el => {
//     el.classList.toggle('dark-theme');
//   });
// }

function toggleIcon() {
  moon.classList.toggle('hidden');
  sun.classList.toggle('hidden');
}

window.addEventListener('load', checkLocalStorage);

// Select the theme preference from localStorage
const currentTheme = localStorage.getItem('theme');

function checkLocalStorage() {
  // if no theme is saved in local storage
  if (currentTheme === null) {
    console.log('null');
    // set the theme as per the OS preference
    if (prefersDarkScheme.matches) {
      toggleText.textContent = 'Light';
      moon.classList.add('hidden');
      sun.classList.remove('hidden');
      theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    } else {
      toggleText.textContent = 'Dark';
      moon.classList.remove('hidden');
      sun.classList.add('hidden');
      theme = document.body.classList.contains('light-theme')
        ? 'light'
        : 'dark';
    }
  } else {
    console.log('here');
    if (currentTheme === 'dark') {
      toggleText.textContent = 'Light';
      moon.classList.add('hidden');
      sun.classList.remove('hidden');
      theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    } else if (currentTheme === 'light') {
      toggleText.textContent = 'Dark';
      moon.classList.remove('hidden');
      sun.classList.add('hidden');
      theme = document.body.classList.contains('light-theme')
        ? 'light'
        : 'dark';
    }
  }
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('click', () => {
  // If the OS is set to dark mode...
  if (prefersDarkScheme.matches) {
    // then apply the .light-theme class to override those styles
    elements.forEach(el => {
      el.classList.toggle('light-theme');
    });
    theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    if (toggleText.textContent === 'Light') {
      toggleText.textContent = 'Dark';
    } else {
      toggleText.textContent = 'Light';
    }
  } else {
    // apply the .dark-theme class to override the default light styles
    elements.forEach(el => {
      el.classList.toggle('dark-theme');
    });
    theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    if (toggleText.textContent === 'Dark') {
      toggleText.textContent = 'Light';
    } else {
      toggleText.textContent = 'Dark';
    }
  }
  toggleIcon();
  localStorage.setItem('theme', theme);
});
