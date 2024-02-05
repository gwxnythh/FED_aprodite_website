/* 
  #preloader
*/
if (document.getElementById('preloader')) {
  document.getElementById('preloader').style.display = 'flex';
}

setTimeout(function () {
  if (document.getElementById('preloader')) {
    document.getElementById('preloader').classList.add('hidden'); /* Trigger transition */
  }
  if (document.getElementById('main-content')) {
    document.getElementById('main-content').style.display = 'block';
  }
}, 4000);


/* 
  #search function
*/
// function to handle search functionality
function searchFn(e) {
  // get the search input element
  var search = document.getElementById("search");
  // convert the input value to uppercase for case-insensitive search
  var inputValue = search.value.toUpperCase();
  // select all product cards
  const cards = document.querySelectorAll('.product-list #product');
  // iterate through each card
  for (const card of cards.values()) {
    // get all text elements within the card
    const texts_to_search_for = [...card.querySelectorAll('.card-content .card-title')];
    // check if any text content includes the search input value
    if (texts_to_search_for.some((txt) => txt.textContent.toUpperCase().includes(inputValue))) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  }
}

// execute search functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // retrieve search value from local storage if available
  var localStorageSearch = localStorage.getItem("search");
  if (localStorageSearch) {
    // set the search input value and trigger the search function
    var search = document.getElementById("search");
    search.setAttribute('value', localStorageSearch);
    searchFn();
    localStorage.removeItem("search");
  }

  // add event listener for form submission
  var searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      // get the current URL
      var currentHref = window.location.href.substring(window.location.href.lastIndexOf('/'));
      // check if the current page is not the shop page
      if (currentHref !== '/shop.html') {
        // set search value in local storage and redirect to shop page
        var search = document.getElementById("search");
        var inputValue = search.value;
        localStorage.setItem("search", inputValue);
        window.location.href = "shop.html";
      } else {
        // execute the search function without redirecting
        searchFn(e);
      }
      // prevent the default form submission
      e.preventDefault();
    });
  }
}, false);

// function to parse URL parameters
function getUrlParams() {
  var url = window.location.href;
  var vars = {};
  // check if the URL has parameters
  if (url.split("?")) {
    var hashes = url.split("?")[1];
    var hash = hashes.split('&');

    // iterate through each parameter
    for (var i = 0; i < hash.length; i++) {
      params = hash[i].split("=");
      vars[params[0]] = params[1];
    }
  }
  return vars;
}


/* 
  #add event on element
*/
const addEventOnElem = function (elem, type, callback) {
  // check if the element is a collection (e.g., NodeList)
  if (elem.length > 1) {
    // iterate through each element in the collection and add the event listener
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    // if the element is not a collection, directly add the event listener
    elem.addEventListener(type, callback);
  }
}

/* 
  #pop-up sales offer
*/
// select elements with the class 'popup-overlay', 'popup', and 'close'
const popupOverlay = document.querySelector('.popup-overlay');
const popup = document.querySelector('.popup');
const close = document.querySelector('.close');

// execute the following code when the window has fully loaded
window.onload = function () {
  // set a timeout to display the popup after 1000 milliseconds (1 second)
  setTimeout(function () {
    if (popupOverlay) {
      popupOverlay.style.display = "block";
    }
    if (popup) {
      popup.style.display = "block";
    }
  }, 1000)
}

// check if the 'close' element exists
if (close) {
  // add a click event listener to the 'close' element
  close.addEventListener('click', () => {
    // hide the popup and overlay when the 'close' element is clicked
    popupOverlay.style.display = "none";
    popup.style.display = "none";
    popupOverlay.style.display = "none"; // this line seems redundant and can be removed
  });
}

/* 
  #navbar toggle
*/
// select elements with specific data attributes
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

// function to toggle the 'active' class on the navbar and overlay
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event listeners to navTogglers to execute toggleNavbar function
addEventOnElem(navTogglers, "click", toggleNavbar);

// function to remove the 'active' class from navbar and overlay
const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

// add click event listeners to navbarLinks to execute closeNavbar function
addEventOnElem(navbarLinks, "click", closeNavbar);

/* 
  #header sticky & back top btn active
*/
// select elements with specific data attributes
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

// function to toggle the 'active' class on header and backTopBtn based on scroll position
const headerActive = function () {
  // check if the vertical scroll position is greater than 150 pixels
  if (window.scrollY > 150) {
    // add 'active' class to header and backTopBtn
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    // remove 'active' class from header and backTopBtn
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

/* 
  #scroll reveal effect
*/
// add scroll event listener to window to execute headerActive function
addEventOnElem(window, "scroll", headerActive);

// variable to store the last scrolled position
let lastScrolledPos = 0;

// function to toggle the 'header-hide' class on header based on scroll direction
const headerSticky = function () {
  // check if the current scroll position is less than or equal to the last scroll position
  if (lastScrolledPos >= window.scrollY) {
    // remove 'header-hide' class from header
    header.classList.remove("header-hide");
  } else {
    // add 'header-hide' class to header
    header.classList.add("header-hide");
  }

  // update the last scrolled position
  lastScrolledPos = window.scrollY;
}

// add scroll event listener to window to execute headerSticky function
addEventOnElem(window, "scroll", headerSticky);

// select elements with specific data attributes
const sections = document.querySelectorAll("[data-section]");

// function to reveal sections when they come into view
const scrollReveal = function () {
  // iterate through each section
  for (let i = 0; i < sections.length; i++) {
    // check if the top of the section is less than half of the window height
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      // add 'active' class to the section
      sections[i].classList.add("active");
    }
  }
}

// execute scrollReveal function on page load
scrollReveal();

// add scroll event listener to window to continuously execute scrollReveal function
addEventOnElem(window, "scroll", scrollReveal);

/* 
  #product filter
*/
// select elements with specific data attributes
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");

// variable to store the last clicked filter button
let lastClickedFilterBtn = filterBtns[0];

// function to handle filtering on button click
const filter = function () {
  // remove 'active' class from the last clicked filter button
  lastClickedFilterBtn.classList.remove("active");
  // add 'active' class to the currently clicked filter button
  this.classList.add("active");
  // update the last clicked filter button
  lastClickedFilterBtn = this;
  // set the 'data-filter' attribute of filterBox to the dataset of the clicked filter button
  filterBox.setAttribute("data-filter", this.dataset.filterBtn);
}

// add click event listeners to filterBtns to execute filter function
addEventOnElem(filterBtns, "click", filter);

/* 
  #account dropdown menu
*/
// function to toggle the visibility of the menu
function toggleMenu() {
  // select the submenu element
  var subMenu = document.getElementById("subMenu");
  // toggle the 'open-menu' class on the submenu element
  subMenu.classList.toggle("open-menu");
}


// add a click event listener to the document to close the menu when clicking outside of it
// Commented: causes the toggle user-pic to not toggle
// document.addEventListener("click", function (event) {
//   console.log('hellow')
//   // select the submenu and user-pic elements
//   var subMenu = document.getElementById("subMenu");
//   var userPic = document.getElementById("user-pic");

//   // check if the click target is not the user-pic and not within the submenu
//   if (
//     event.target !== userPic &&
//     event.target.closest("#subMenu") === null
//   ) {
//     // remove the 'open-menu' class from the submenu element
//     subMenu.classList.remove("open-menu");
//   }
// });


/* 
  #form validator
*/
// function to validate the form before submission
function validateForm() {
  // select the message input element
  var messageInput = document.getElementById('messageInput');
  // get the trimmed value of the message input
  var message = messageInput.value.trim();

  // check if the message length is less than 10 characters
  if (message.length < 10) {
    // display an alert if the message is too short
    alert("Please enter a message with at least 10 characters.");
  } else {
    // display a success alert and submit the form if the message is valid
    alert("Submitted Successfully! We will get back to you in 24-48 hours! :)");
    document.getElementById('contactForm').submit();
  }
}

/* 
  #game menu button to direct to respective pages
*/
function redirectToMemoryGame() {
  // Memory game 
  window.location.href = 'game-memory.html';
}

function redirectToQuiz() {
  // Quiz game
  window.location.href = 'game-quiz.html';
}