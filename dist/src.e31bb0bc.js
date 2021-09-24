// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"theme.js":[function(require,module,exports) {
const STORAGE_KEY = 'user-color-scheme'; // stores user's preference in local storage

const COLOR_MODE_KEY = '--color-mode'; // extracts the current CSS Custom Property value (--color-mode)

const modeToggleButton = document.querySelector('.toggle');
const modeToggleText = document.querySelector('.toggle__text');
const modeToggleStatus = document.querySelector('.status');
const sun = document.querySelector('.sunSvgEl');
const moon = document.querySelector('.moonSvgEl'); // Extracts the --color-mode value:
// The end result will be either "light" or "dark", depending on the media query

function getCSSCustomProp(propKey) {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }

  return response;
} // This function tries to load a setting that’s either passed in or from local storage as a fallback—then, depending wether a setting was loaded or not.
// The function applies the data-user-color-scheme attribute if necessary.
// It then updates the button label and the status text with another function


function applySetting(passedSetting) {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setTextAndIcon(currentSetting);
  } else {
    setTextAndIcon(getCSSCustomProp(COLOR_MODE_KEY));
  }
} // Sets the text depending on what the current colour mode is.
// Because it's always either 'dark' or 'light' value, either from local storage or the CSS property, the status can display what the colour mode currently is.


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
} // Tries to load the current setting from local storage.
// It then runs what it got through a switch.
// If the setting is found, it inverts it.
// If not, it loads from CSS, then inverts that instead.
// Then it returns the setting that it calculated.


function toggleSetting() {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
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
},{}],"app.js":[function(require,module,exports) {
const BASE = 'https://api.github.com/users/';
const btn = document.querySelector('.btn'); // Links and text placeholders - social section of the app

const city = document.querySelector('.social__city--name');
const cityIcon = document.querySelector('.icon-svg-city');
const websiteText = document.querySelector('.social__website__text');
const websiteLink = document.querySelector('.social__website a');
const webIcon = document.querySelector('.icon-svg-web');
const twitterText = document.querySelector('.social__twitter__text');
const twitterLink = document.querySelector('.social__twitter a');
const twitterIcon = document.querySelector('.icon-svg-twitter');
const companyText = document.querySelector('.social__company__text');
const companyIcon = document.querySelector('.icon-svg-company'); // Removes styling on each search event

function removePreviousSearchStyles() {
  const allSvgs = document.querySelectorAll('.icon');
  const allLinks = document.querySelectorAll('.social a'); // Restores SVG icons to their original styles

  allSvgs.forEach(svgIcon => {
    svgIcon.style.opacity = '1';
  }); // Deletes the link text and href

  allLinks.forEach(link => {
    link.href = '';
    link.innerText = '';
    link.style.opacity = '1';
  }); // Restores styles for items that are not links

  city.style.opacity = '1';
  companyText.style.opacity = '1';
} // Shows a tailored error message if user cannot be found
// Clears the input placeholder text and error message onfocus


function showErrorMessage() {
  const input = document.querySelector('#search');
  input.placeholder = '';
  const errorMsg = document.querySelector('.errorMsg');
  errorMsg.innerText = 'No results';

  input.onfocus = () => {
    errorMsg.innerText = '';
  };
} // If requested info is not available for any of the elements in the social section,
// this function will apply styles to the defaul text (Not Available)


function applyUnavailable(spanElement, icon) {
  spanElement.style.opacity = '0.5';
  spanElement.style.cursor = 'not-allowed';
  icon.style.opacity = '0.5';
} // On the next search, if info is available for the social section, these styles are to apply


function applyAvailable(spanElement, icon) {
  spanElement.innerText = '';
  spanElement.style.cursor = 'pointer';
  icon.style.opacity = '1'; // link.style.opacity = 1;
} // Takes user's input and appends it to the BASE github API link,
// then converts the data into json and the json data are then passed into
// populateUserCard - to display relevant available information


async function getUser(username) {
  const response = await fetch(BASE + username);
  const data = await response.json();
  console.log(data);
  populateUserCard(data);
} // Takes in data from the API call to github and populates the fields accordingly


function populateUserCard(user) {
  // Updates avatar
  const avatar = document.querySelector('.user__avatar');
  avatar.src = user.avatar_url; // Updates user's name

  const userName = document.querySelector('.user__name');

  if (user.name) {
    userName.innerText = user.name;
  } else {
    userName.innerText = 'No name';
  } // Updates user's login


  const userAccount = document.querySelector('.user__account');

  if (user.login) {
    userAccount.innerText = "@".concat(user.login);
  } else {
    userAccount.innerText = 'No information';
    showErrorMessage();
  } // Updates the date the user joined GitHub


  const dateJoined = document.querySelector('.user__creation');

  if (user.created_at) {
    let accountCreated = new Date(user.created_at);
    dateJoined.innerText = "Joined ".concat(accountCreated.toLocaleDateString());
  } else {
    dateJoined.innerText = "No information";
  } // Updates user's bio


  const userBio = document.querySelector('.profile__intro');

  if (user.bio) {
    userBio.innerText = user.bio;
  } else {
    userBio.innerText = "No information is available";
  } // Updates the table


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
  } // Updates the links and text in the social section
  // User location (span)


  if (!user.location) {
    city.innerText = 'Not Available';
    applyUnavailable(city, cityIcon);
  } else {
    city.innerText = ''; // city.style.cursor = 'pointer';
    // cityIcon.style.opacity = '1';

    applyAvailable(city, cityIcon);
    city.innerText = user.location;
  } // User's website: span if not available or link if available


  if (!user.blog) {
    websiteText.innerText = 'Not Available';
    applyUnavailable(websiteText, webIcon);
  } else {
    applyAvailable(websiteText, webIcon);
    websiteLink.href = user.blog;
    websiteLink.innerText = user.blog;
    websiteLink.style.opacity = 1;
  } // User's twitter: span if not available or link if available


  if (!user.twitter_username) {
    twitterText.innerText = 'Not Available';
    applyUnavailable(twitterText, twitterIcon);
  } else {
    applyAvailable(twitterText, twitterIcon);
    twitterLink.href = "https://twitter.com/".concat(user.twitter_username);
    twitterLink.innerText = user.twitter_username;
    twitterLink.style.opacity = 1;
  } // User's company name (span)


  if (!user.company) {
    companyText.innerText = 'Not Available';
    applyUnavailable(companyText, companyIcon);
  } else {
    applyAvailable(companyText, companyIcon);
    companyText.innerText = user.company;
  }
} // EVENT LISTENERS


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
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./theme");

require("./app");
},{"./theme":"theme.js","./app":"app.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59993" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map