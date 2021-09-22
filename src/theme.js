const STORAGE_KEY = 'user-color-scheme'; // stores user's preference in local storage
const COLOR_MODE_KEY = '--color-mode'; // extracts the current CSS Custom Property value (--color-mode)

const modeToggleButton = document.querySelector('.toggle');
const modeToggleText = document.querySelector('.toggle__text');
const modeToggleStatus = document.querySelector('.status');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

// Extracts the --color-mode value:
// The end result will be either "light" or "dark", depending on the media query
function getCSSCustomProp(propKey) {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );
  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }
  return response;
}

// This function tries to load a setting that’s either passed in or from local storage as a fallback—then, depending wether a setting was loaded or not.
// The function applies the data-user-color-scheme attribute if necessary.
// It then updates the button label and the status text with another function
function applySetting(passedSetting) {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  if (currentSetting) {
    document.documentElement.setAttribute(
      'data-user-color-scheme',
      currentSetting
    );
    setButtonLabelAndStatus(currentSetting);
  } else {
    setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
  }
}

// Sets the text depending on what the current colour mode is.
// Because it's always either 'dark' or 'light' value, either from local storage or the CSS property, the status can display what the colour mode currently is.
function setButtonLabelAndStatus(currentSetting) {
  modeToggleText.innerText = `${currentSetting === 'dark' ? 'light' : 'dark'}`;
  if (currentSetting === 'dark') {
    moon.classList.add('hidden');
    sun.classList.remove('hidden');
  } else {
    moon.classList.remove('hidden');
    sun.classList.add('hidden');
  }
}

// Tries to load the current setting from local storage.
// It then runs what it got through a switch.
// If the setting is found, it inverts it.
// If not, it loads from CSS, then inverts that instead.
// Then it returns the setting that it calculated.
function toggleSetting() {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
}

modeToggleButton.addEventListener('click', evt => {
  applySetting(toggleSetting());
});

applySetting();
