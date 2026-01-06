"use strict";
const header = document.querySelector(".header");
const iconoMenu = document.querySelectorAll(".icon-mobile-nav");

console.log(iconoMenu);

const menuResponsive = function () {
  header.classList.toggle("nav-open");
};

iconoMenu.forEach(function (i) {
  i.addEventListener("click", menuResponsive);
});
