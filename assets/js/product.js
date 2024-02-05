/* 
  #per product img
*/
// function to change the source of an image with the class 'slide'
function img(anything) {
  // select the image element with the class 'slide' and set its source to the provided parameter
  document.querySelector('.slide').src = anything;
}

// function to change the background color of an element with the class 'home'
function change(change) {
  // select the element with the class 'home' and set its background color to the provided parameter
  const line = document.querySelector('.home');
  line.style.background = change;
}

/* 
  #quantity button
*/
// select elements with classes 'plus', 'minus', and 'num'
const plus = document.querySelector(".plus"),
  minus = document.querySelector(".minus"),
  num = document.querySelector(".num");

// initialize a variable 'a' with a starting value of 1
let a = 1;

// add a click event listener to the 'plus' element
plus.addEventListener("click", () => {
  // increment 'a'
  a++;
  // limit the quantity to a maximum of 10
  a = (a < 10) ? a : 10;
  // update the displayed quantity in the 'num' element
  num.innerText = (a < 10) ? "0" + a : a.toString();
});

// add a click event listener to the 'minus' element
minus.addEventListener("click", () => {
  // check if 'a' is greater than 1 before decrementing
  if (a > 1) {
    // decrement 'a'
    a--;
    // update the displayed quantity in the 'num' element
    num.innerText = (a < 10) ? "0" + a : a.toString();
  }
});


/* 
  #versions selector
*/
// select the element with the id 'colorSelector' and the element with the class 'main-image img'
const colorSelector = document.getElementById('colorSelector');
const productImage = document.querySelector('.main-image img');

// add a click event listener to the 'colorSelector' element
colorSelector.addEventListener('click', function (event) {
  // check if the clicked target is a 'SPAN' element
  if (event.target.tagName === 'SPAN') {
    // get the value of the 'data-img' attribute from the clicked 'SPAN' element
    const imgSrc = event.target.getAttribute('data-img');

    // set the source of the 'productImage' to the obtained 'imgSrc'
    productImage.src = imgSrc;
  }
});
