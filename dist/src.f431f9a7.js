parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"m3VC":[function(require,module,exports) {
const e="user-color-scheme",t="--color-mode",o=document.querySelector(".toggle"),r=document.querySelector(".toggle__text"),c=document.querySelector(".status"),l=document.querySelector(".sunSvgEl"),n=document.querySelector(".moonSvgEl");function d(e){let t=getComputedStyle(document.documentElement).getPropertyValue(e);return t.length&&(t=t.replace(/\"/g,"").trim()),t}function a(o){let r=o||localStorage.getItem(e);r?(document.documentElement.setAttribute("data-user-color-scheme",r),u(r)):u(d(t))}function u(e){"dark"===e?(r.innerText="light",n.classList.add("hidden"),l.classList.remove("hidden")):(r.innerText="dark",n.classList.remove("hidden"),l.classList.add("hidden"))}function s(){let o=localStorage.getItem(e);switch(o){case null:o="dark"===d(t)?"light":"dark";break;case"light":o="dark";break;case"dark":o="light"}return localStorage.setItem(e,o),o}o.addEventListener("click",e=>{a(s())}),a();
},{}],"A2T1":[function(require,module,exports) {
const e="https://api.github.com/users/",t=document.querySelector(".btn"),o=document.querySelector(".social__city--name"),n=document.querySelector(".icon-svg-city"),r=document.querySelector(".social__website__text"),c=document.querySelector(".social__website a"),i=document.querySelector(".icon-svg-web"),l=document.querySelector(".social__twitter__text"),a=document.querySelector(".social__twitter a"),u=document.querySelector(".icon-svg-twitter"),s=document.querySelector(".social__company__text"),y=document.querySelector(".icon-svg-company");function m(){const e=document.querySelectorAll(".icon"),t=document.querySelectorAll(".social a");e.forEach(e=>{e.style.opacity="1"}),t.forEach(e=>{e.href="",e.innerText="",e.style.opacity="1"}),o.style.opacity="1",s.style.opacity="1"}function _(){const e=document.querySelector("#search");e.placeholder="";const t=document.querySelector(".errorMsg");t.innerText="No results",e.onfocus=(()=>{t.innerText=""})}function d(e,t){e.style.opacity="0.5",e.style.cursor="not-allowed",t.style.opacity="0.5"}function x(e,t){e.innerText="",e.style.cursor="pointer",t.style.opacity="1"}async function T(t){const o=await fetch(e+t),n=await o.json();console.log(n),f(n)}function f(e){document.querySelector(".user__avatar").src=e.avatar_url;const t=document.querySelector(".user__name");e.name?t.innerText=e.name:t.innerText="No name";const m=document.querySelector(".user__account");e.login?m.innerText="@".concat(e.login):(m.innerText="No information",_());const T=document.querySelector(".user__creation");if(e.created_at){let t=new Date(e.created_at);T.innerText="Joined ".concat(t.toLocaleDateString())}else T.innerText="No information";const f=document.querySelector(".profile__intro");e.bio?f.innerText=e.bio:f.innerText="No information is available";const p=document.querySelector(".profile__repos"),S=document.querySelector(".profile__followers"),q=document.querySelector(".profile__following");e.login?(p.innerText=e.public_repos,S.innerText=e.followers,q.innerText=e.following):(p.innerText="n/a",S.innerText="n/a",q.innerText="n/a"),e.location?(o.innerText="",x(o,n),o.innerText=e.location):(o.innerText="Not Available",d(o,n)),e.blog?(x(r,i),c.href=e.blog,c.innerText=e.blog,c.style.opacity=1):(r.innerText="Not Available",d(r,i)),e.twitter_username?(x(l,u),a.href="https://twitter.com/".concat(e.twitter_username),a.innerText=e.twitter_username,a.style.opacity=1):(l.innerText="Not Available",d(l,u)),e.company?(x(s,y),s.innerText=e.company):(s.innerText="Not Available",d(s,y))}t.addEventListener("click",e=>{e.preventDefault(),m();const t=document.querySelector("#search"),o=t.value.toLowerCase();o&&(T(o),t.value="")});
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./theme"),require("./app");
},{"./theme":"m3VC","./app":"A2T1"}]},{},["Focm"], null)