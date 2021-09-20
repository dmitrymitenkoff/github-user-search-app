const BASE = 'https://api.github.com/users/';
const btn = document.querySelector('.btn');
const avatar = document.querySelector('.user__avatar');
const userName = document.querySelector('.user__name');
const userAccount = document.querySelector('.user__account');
const dateJoined = document.querySelector('.user__creation');
const profileIntro = document.querySelector('.profile__intro');
const repos = document.querySelector('.profile__repos');
const followers = document.querySelector('.profile__followers');
const following = document.querySelector('.profile__following');
const city = document.querySelector('.social__city--name');
const website = document.querySelector('.social__website--address');
const twitter = document.querySelector('.social__twitter--link');
const company = document.querySelector('.social__company--name');

async function getUser(name) {
  try {
    const response = await fetch(BASE + name);
    const profile = await response.json();
    console.log(profile);
    avatar.src = profile.avatar_url;
    if (profile.name === null) {
      userName.textContent = 'Name is unavailable';
    } else {
      userName.textContent = profile.name;
    }
    userAccount.textContent = `@${profile.login}`;
    let accountCreated = new Date(profile.created_at);
    dateJoined.textContent = `Joined ${accountCreated.toLocaleDateString()}`;
    if (profile.bio === null) {
      profileIntro.textContent = 'No bio information is available!';
    } else {
      profileIntro.textContent = profile.bio;
    }
    repos.textContent = profile.public_repos;
    followers.textContent = profile.followers;
    following.textContent = profile.following;
    city.textContent = profile.location;
    website.textContent = profile.blog;
    twitter.textContent = profile.twitter_username;
    company.textContent = profile.company;
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener('click', event => {
  event.preventDefault();
  const input = document.querySelector('#search');
  const username = input.value.toLowerCase();
  if (username) {
    getUser(username);
    input.value = '';
  }
});
