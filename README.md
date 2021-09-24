# GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6).

## Table of contents

- [Overview](#overview)
  - [The app](#the-app)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The app

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- Have the correct color scheme chosen for them based on their computer preferences.

### Screenshots

![light-theme](./src/screenshots/light-theme.jpeg)
![dark-theme](./src/screenshots/dark-theme.jpeg)

### Links

- Repository: [GitHub](https://github.com/dmitrymitenkoff/github-user-search-app)
- Live: [devfinder app](https://github-user-search-app-flame.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Third-party APIs
- Sass
- Parcel web app bundler

### What I learned

1. Switching between light and dark modes.
   I learned how to set dark and light themese automatically as per user's OS settings. I also implemented the ability for users to manually toggle between the themes and save to local storage the preferred one. The process wasn't straightforward and involved a number of steps both in CSS and JavaScript.

i. I created a theme-style Sass partial into which I saved all the root variables (using CSS Custom Properties). The root styles are on the html element directly. I also set the "--color-mode" variable to "light" as a default theme. This value is then used in the JS theme switcher file: it tells the JavaScript what the user's theme preference is:

```css
:root {
  --color-mode: 'light';
  --color-light-primary: #ffffff;
  --color-light-secondary: #f5f7ff;
  --background-body: var(--color-light-secondary);
  --background-input: var(--color-light-primary);
  --background-card: var(--color-light-primary);
  --background-table: var(--color-light-secondary);
```

ii. I then set basic color styles for the light theme and created a media query that deals with user's OS preferences - "prefers-color-scheme". Under the media query, I also added a "data-user-color-scheme" and set it to "dark". In the media query, I changed the root color mode to dark, like so:

```css
body {
  background-color: var(--background-body);
  color: var(--color-dark-primary);
  transition: background 500ms ease-in-out, color 200ms ease;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-mode: 'dark';
  }
  :root:not([data-user-color-scheme]) {
    --background-body: var(--color-dark-body);
    --background-input: var(--color-dark-input);
    --background-card: var(--color-dark-input);
    --background-table: var(--color-dark-body);
  }
}
[data-user-color-scheme='dark'] {
  --background-body: var(--color-dark-body);
  --background-input: var(--color-dark-input);
  --background-card: var(--color-dark-input);
  --background-table: var(--color-dark-body);
}
```

iii. In the JavaScript file I created variables to store user's preferences and settings in the local storage as well as targeted a number of DOM elements to let the user manually change themes. I then created a function that allowed me to extract the user's "--color-mode" value. The function returns either "light" or "dark":

```js
function getCSSCustomProp(propKey) {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );
  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }
  return response;
}
```

iv. After that, I created a function that either applies the user's theme preference stored in localStorage or if it's just passed in from the CSS color mode setting:

```js
function applySetting(passedSetting) {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  if (currentSetting) {
    document.documentElement.setAttribute(
      'data-user-color-scheme',
      currentSetting
    );
    setTextAndIcon(currentSetting);
  } else {
    setTextAndIcon(getCSSCustomProp(COLOR_MODE_KEY));
  }
}eturn response;
}
```

v. As the next step, I created a function to updated the toggle text and icon as per the user's preference. It sets the text depending on what teh current theme is, which is always either "dark" or "light":

```js
function setTextAndIcon(currentSetting) {
  if (currentSetting === 'dark') {
    modeToggleText.innerText = 'light';
    moon.classList.add('hidden');
    sun.classList.remove('hidden');
  } else {
    modeToggleText.innerText = 'dark';
    moon.classList.remove('hidden');
    sun.classList.add('hidden');
  }
}
```

vi. Next, I added a function to toggle themes. At first it attemps to use the current setting as set in the local storage. It then runs the value through a switch: if the mode is found, the function overrides it. If the mode value is not stored in the local storage, the function loads the mode value from CSS instead and overrides it:

```js
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
```

vii. Finally, I added an event listener on the toggle to apply the current setting which is returned into the applySetting() function.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
