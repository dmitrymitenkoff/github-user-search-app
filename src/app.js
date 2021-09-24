const BASE = 'https://api.github.com/users/';
const btn = document.querySelector('.btn');

// Links and text placeholders - social section of the app
const city = document.querySelector('.social__city--name');
const cityIcon = document.querySelector('.icon-svg-city');

const websiteText = document.querySelector('.social__website__text');
const websiteLink = document.querySelector('.social__website a');
const webIcon = document.querySelector('.icon-svg-web');

const twitterText = document.querySelector('.social__twitter__text');
const twitterLink = document.querySelector('.social__twitter a');
const twitterIcon = document.querySelector('.icon-svg-twitter');

const companyText = document.querySelector('.social__company__text');
const companyIcon = document.querySelector('.icon-svg-company');

// Removes styling on each search event
function removePreviousSearchStyles() {
  const allSvgs = document.querySelectorAll('.icon');
  const allLinks = document.querySelectorAll('.social a');

  // Restores SVG icons to their original styles
  allSvgs.forEach(svgIcon => {
    svgIcon.style.opacity = '1';
  });

  // Deletes the link text and href
  allLinks.forEach(link => {
    link.href = '';
    link.innerText = '';
    link.style.opacity = '1';
  });

  // Restores styles for items that are not links
  city.style.opacity = '1';
  companyText.style.opacity = '1';
}

// Shows a tailored error message if user cannot be found
// Clears the input placeholder text and error message onfocus
function showErrorMessage() {
  const input = document.querySelector('#search');
  input.placeholder = '';
  const errorMsg = document.querySelector('.errorMsg');
  errorMsg.innerText = 'No results';
  input.onfocus = () => {
    errorMsg.innerText = '';
  };
}

// If requested info is not available for any of the elements in the social section,
// this function will apply styles to the defaul text (Not Available)
function applyUnavailable(spanElement, icon) {
  spanElement.style.opacity = '0.5';
  spanElement.style.cursor = 'not-allowed';
  icon.style.opacity = '0.5';
}

// On the next search, if info is available for the social section, these styles are to apply
function applyAvailable(spanElement, icon) {
  spanElement.innerText = '';
  spanElement.style.cursor = 'pointer';
  icon.style.opacity = '1';
  // link.style.opacity = 1;
}

// Takes user's input and appends it to the BASE github API link,
// then converts the data into json and the json data are then passed into
// populateUserCard - to display relevant available information
async function getUser(username) {
  const response = await fetch(BASE + username);
  const data = await response.json();
  console.log(data);
  populateUserCard(data);
}

// Takes in data from the API call to github and populates the fields accordingly
function populateUserCard(user) {
  // Updates avatar
  const avatar = document.querySelector('.user__avatar');
  avatar.src = user.avatar_url;

  // Updates user's name
  const userName = document.querySelector('.user__name');
  if (user.name) {
    userName.innerText = user.name;
  } else {
    userName.innerText = 'No name';
  }

  // Updates user's login
  const userAccount = document.querySelector('.user__account');
  if (user.login) {
    userAccount.innerText = `@${user.login}`;
  } else {
    userAccount.innerText = 'No information';
    showErrorMessage();
  }

  // Updates the date the user joined GitHub
  const dateJoined = document.querySelector('.user__creation');
  if (user.created_at) {
    let accountCreated = new Date(user.created_at);
    dateJoined.innerText = `Joined ${accountCreated.toLocaleDateString()}`;
  } else {
    dateJoined.innerText = `No information`;
  }

  // Updates user's bio
  const userBio = document.querySelector('.profile__intro');
  if (user.bio) {
    userBio.innerText = user.bio;
  } else {
    userBio.innerText = `No information is available`;
  }

  // Updates the table
  const repos = document.querySelector('.profile__repos');
  const followers = document.querySelector('.profile__followers');
  const following = document.querySelector('.profile__following');
  if (!user.login) {
    repos.innerText = 'n/a';
    followers.innerText = 'n/a';
    following.innerText = 'n/a';
  } else {
    repos.innerText = user.public_repos;
    followers.innerText = user.followers;
    following.innerText = user.following;
  }

  // Updates the links and text in the social section
  // User location (span)
  if (!user.location) {
    city.innerText = 'Not Available';
    applyUnavailable(city, cityIcon);
  } else {
    city.innerText = '';
    // city.style.cursor = 'pointer';
    // cityIcon.style.opacity = '1';
    applyAvailable(city, cityIcon);
    city.innerText = user.location;
  }

  // User's website: span if not available or link if available
  if (!user.blog) {
    websiteText.innerText = 'Not Available';
    applyUnavailable(websiteText, webIcon);
  } else {
    applyAvailable(websiteText, webIcon);
    websiteLink.href = user.blog;
    websiteLink.innerText = user.blog;
    websiteLink.style.opacity = 1;
  }

  // User's twitter: span if not available or link if available
  if (!user.twitter_username) {
    twitterText.innerText = 'Not Available';
    applyUnavailable(twitterText, twitterIcon);
  } else {
    applyAvailable(twitterText, twitterIcon);
    twitterLink.href = `https://twitter.com/${user.twitter_username}`;
    twitterLink.innerText = user.twitter_username;
    twitterLink.style.opacity = 1;
  }

  // User's company name (span)
  if (!user.company) {
    companyText.innerText = 'Not Available';
    applyUnavailable(companyText, companyIcon);
  } else {
    applyAvailable(companyText, companyIcon);
    companyText.innerText = user.company;
  }
}

// EVENT LISTENERS
btn.addEventListener('click', event => {
  event.preventDefault();
  removePreviousSearchStyles();
  const input = document.querySelector('#search');
  const username = input.value.toLowerCase();
  if (username) {
    getUser(username);
    input.value = '';
  }
});
