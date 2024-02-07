

/*
    #shopping bag/cart feature
*/
// Create an empty shopping cart
var cart = [];
// Select elements from the HTML document
var listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart-icon span');
let totalPriceSpan = document.querySelector('.shoppingCart .total-price span');
let closeBtn = document.querySelector('.shoppingCart .check-out');

const tierPromoCodes = [
    {name : 'SILVER10OFF', discount : 10},
    {name : 'GOLD20OFF', discount : 20},
    {name : 'PLAT40OFF', discount : 40},
]

const gameVoucherPromoCodes = [
    {name : 'WINNER20', discount : 20},
    {name : 'NEWYEAR24', discount : 24},
    {name : 'GLOWING', discount : 5},
    {name : 'BEAUTY', discount : 7},
    {name : 'EHNA', discount : 28},
    {name : 'NEWCUSTOMER', discount : 20},
]


// Retrieve cart data from localStorage if available
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    // Display items in the cart
    addItemToHtml();
}

// Listen for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select relevant elements
    var body = document.querySelector('body');
    var iconCart = document.querySelector('.cart-icon');
    var closeCart = document.querySelector('.close-cart');
    var cartListing = document.querySelector('.cartListing');

    // Toggle the visibility of the shopping cart on icon click
    if (iconCart) {
        iconCart.addEventListener('click', () => {
            body.classList.toggle('showCart');
            applyPromoCodeStyling();
        })
    }

    // Toggle the visibility of the shopping cart on close button click
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            body.classList.toggle('showCart');
        })
    }

    // Toggle the visibility of the shopping cart on checkout button click
    if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
            body.classList.toggle('showCart');
        })
    }
})

// Add a product to the shopping cart
function addProductToCart(productId, imgSrc, name, price, version) {
    // Get the quantity from the UI value
    var numQuantity = document.querySelector(".num");
    var quantity = 1;

    // Update quantity if UI element is found
    if (numQuantity) {
        quantity = Number(numQuantity.innerText);
    }

    // Find the position of the product in the cart
    let positionThisProductInCart = cart.findIndex((value) => value.productId == productId);

    // Add the product to the cart or update its quantity
    if (positionThisProductInCart < 0) {
        cart.push({
            productId: productId,
            quantity: quantity,
            imgSrc: imgSrc,
            name: name,
            price: price,
            version: version
        });
    } else {
        cart[positionThisProductInCart].quantity += quantity;
    }

    // Update the HTML display and localStorage
    addItemToHtml();
    addToLocalStorage();
}

// Update the HTML display with items in the cart
function addItemToHtml() {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    var totalPrice = Number(0);

    // Display each item in the cart
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.productId;

            // Calculate the total price for the individual item
            var itemPrice = Number(item.price * item.quantity).toFixed(2);
            totalPrice += Number(itemPrice);

            // Append the item to the HTML
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="image">
                    <img src="${item.imgSrc}">
                </div>
                <div class="name">
                ${item.name}
                </div>
                <div class="totalPrice">$${itemPrice}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
                `;
        })
    }

    // Update total quantity and price in the cart icon
    iconCartSpan.innerText = totalQuantity;
    // check for discounted price
    let discountedPercentage = 0;
    if (localStorage.getItem('currentPromoCode')) {
        discountedPercentage = Number(JSON.parse(localStorage.getItem('currentPromoCode')).discount) / 100;
        totalPrice = totalPrice * (1 - discountedPercentage);
    }
    totalPriceSpan.innerText = '$' + Number(totalPrice).toFixed(2);
}

/*
    Shopping Cart Quantity Listener
*/
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let productId = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        // Update quantity based on user input
        updateQuantity(productId, type);
    }
})

// Update the quantity of a product in the cart
function updateQuantity(productId, type) {
    let positionItemInCart = cart.findIndex((value) => value.productId == productId);
    if (positionItemInCart >= 0) {
        // Get information about the item
        let info = cart[positionItemInCart];
        // Update quantity based on the type (plus or minus)
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                // Remove the item from the cart if quantity becomes zero
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }

    // Update the HTML display and localStorage
    addItemToHtml();
    addToLocalStorage();
}

// Save the cart data to localStorage
function addToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear the cart data from localStorage
function clearLocalStorage(item) {
    localStorage.removeItem(item);
}


/*
    send cart items to database
*/
const APIKEY = "65abfab7e0155af749808958";

document.getElementById("checkOut").addEventListener("click", function (e) {
    // prevents default action of the button
    e.preventDefault();

    if (getAccount() === false) {
        window.alert("You are not logged in and unable to check out")
    }
    else {
        let listOfItems = []
        // grabs each item in the cart and send to database
        cart.forEach((item) => {
            var itemPrice = Number(item.price * item.quantity).toFixed(2);
            if (localStorage.getItem('currentPromoCode')) {
                var discountedPercentage = Number(JSON.parse(localStorage.getItem('currentPromoCode')).discount) / 100;
                itemPrice = Number(item.price * item.quantity * (1 - discountedPercentage)).toFixed(2)
            }

            let jsondata = {
                name: sessionStorage.getItem("name"),
                product: item.name,
                quantity: item.quantity,
                totalcost: itemPrice,
            };

            console.log(jsondata);
            listOfItems.push(jsondata)
        });

        let settings = {
            method: "POST", // post = send to db
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(listOfItems),
        };

        // bulk insert
        fetch("https://aproditedb-320d.restdb.io/rest/orders", settings)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateMemberInfo(listOfItems); // CHANGE
            });

        // clear the cart after user checks out
        cart = [];

        // update the HTML display
        addItemToHtml();

        // update my database
        window.alert("Order Sent!");
        cart = []
        let totalPrice = 0
        // check for discounted price
        let discountedPercentage = 0;
        if (localStorage.getItem('currentPromoCode')) {
            discountedPercentage = Number(JSON.parse(localStorage.getItem('currentPromoCode')).discount) / 100;
            totalPrice = totalPrice * (1 - discountedPercentage);
        }
        totalPriceSpan.innerText = '$' + Number(totalPrice).toFixed(2);
        clearLocalStorage("cart");
        // Clear current promo code
        clearLocalStorage("currentPromoCode");
        applyPromoCodeStyling();
        addItemToHtml();
        var inputPromoCode = document.getElementById('promoCodeInput');
        inputPromoCode.value = '';
    }
});

// Function to update member information
function updateMemberInfo(listOfItems) {
    const name = sessionStorage.getItem("name");

    // Fetch the current membership information
    fetch(`https://aproditedb-320d.restdb.io/rest/membership?q={"name":"${name}"}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching membership. Status: " + response.status);
        }
    })
    .then(data => {
        const membership = data.find((member) => member.name === name);
        if (membership) {
            // Update totalPurchase
            const updatedTotalPurchase = membership.totalPurchase + listOfItems.length; //(membership.totalPurchase || 0) + 1

            // Check if totalPurchase is more than 5, change tier to "silver"
            let updatedTier = membership.tier;
            if (updatedTotalPurchase >= 5 && updatedTotalPurchase < 10) {
                updatedTier = "silver";
            } else if (updatedTotalPurchase >= 10 && updatedTotalPurchase <= 15) {
                updatedTier = "gold";
            } else if (updatedTotalPurchase > 15) {
                updatedTier = "platinum";
            } 

            // Update the member's information in the database
            const updateSettings = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache",
                },
                body: JSON.stringify({ 
                    name: membership.name,
                    email: membership.email,
                    totalPurchase: updatedTotalPurchase, 
                    tier: updatedTier 
                }),
            };

            return fetch(`https://aproditedb-320d.restdb.io/rest/membership/${membership._id}`, updateSettings);
        } else {
            console.log("Member not found");
        }
    })
    .then(updateResponse => {
        if (updateResponse.ok) {
            return updateResponse.json();
        } else {
            throw new Error("Error updating member information. Status: " + updateResponse.status);
        }
    })
    .then(updateData => {
        console.log("Member information updated:", updateData);
    })
    .catch(error => {
        console.error("Error updating member information:", error);
    });
}

// Call the function to update member information whenever needed
// updateMemberInfo();

async function getMembershipByName(name) {
    // Fetch the current membership information
    return await fetch(`https://aproditedb-320d.restdb.io/rest/membership?q={"name":"${name}"}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error fetching membership. Status: " + response.status);
        }
    })
    .then(data => {
        const membership = data.find((member) => member.name === name);
        if (membership) {
            return membership;
        } else {
            console.log("Member not found");
        }
    })
}


document.getElementById("promoCode").addEventListener("click", function (e) {
    // prevents default action of the button
    e.preventDefault();

    // Check if promo code is already applied
    if (localStorage.getItem('currentPromoCode')) {
        window.alert("Promo code already applied. Please remove the promo code before applying a new one.");
    }

    if (getAccount() === false) {
        window.alert("You are not logged in and unable to apply promo code")
    } else {
        const promoCode = document.getElementById("promoCodeInput").value;
        if (isValidPromoCodes(promoCode)) {
            if (tierPromoCodes.map((promo) => promo.name).includes(promoCode)) {
                applyMemberPromoCode(promoCode);
            } else if (gameVoucherPromoCodes.map((promo) => promo.name).includes(promoCode)) {
                applyPromoCode(promoCode);
            }
        } else {
            window.alert("Invalid promo code. Please enter a valid promo code.");
        }
    }
});

async function applyMemberPromoCode(promoCode) {
    const name = sessionStorage.getItem("name");
    const membership = await getMembershipByName(name);
    if (membership) {
        if (membership.tier === "silver" && promoCode === "SILVER10OFF") {
            applyPromoCode(promoCode);
        } else if (membership.tier === "gold" && (promoCode === "GOLD20OFF" || promoCode === "SILVER10OFF")) {
            applyPromoCode(promoCode);
        } else if (membership.tier === "gold" && (promoCode === "GOLD20OFF" || promoCode === "SILVER10OFF" || promoCode === "PLAT40OFF")) {
            applyPromoCode(promoCode);
        } else {
            window.alert("You are not eligible for this promo code.");
        }
    }
}

document.getElementById("removeCode").addEventListener("click", function (e) {
    // prevents default action of the button
    e.preventDefault();

    if (getAccount() === false) {
        window.alert("You are not logged in and unable to apply promo code")
    } else {
        // Check if promo code is already applied
        if (localStorage.getItem('currentPromoCode')) {
            localStorage.removeItem('currentPromoCode');
            applyPromoCodeStyling();
            addItemToHtml();
            var inputPromoCode = document.getElementById('promoCodeInput');
            inputPromoCode.value = '';
        }
    }
});

function applyPromoCodeStyling() {
    var showNode;
    var hideNode;
    if(localStorage.getItem("currentPromoCode")) {
        showNode = document.getElementById('applied-promo-code');
        hideNode = document.getElementById('input-promo-code');
        let promoCodeObject = JSON.parse(localStorage.getItem("currentPromoCode"));
        previewPromoCode.placeholder = promoCodeObject.name;
    } else {
        showNode = document.getElementById('input-promo-code');
        hideNode = document.getElementById('applied-promo-code');
    }
    showNode.style.visibility = 'visible';
    showNode.style.display = 'grid'
    hideNode.style.visibility = 'hidden';
    hideNode.style.display = 'none'
}

function applyPromoCode(promoCode) {
    let promoCodeObject = getPromoCodeObject(promoCode);
    localStorage.setItem('currentPromoCode', JSON.stringify(promoCodeObject));
    applyPromoCodeStyling()
    let previewPromoCode = document.getElementById('previewPromoCode');
    previewPromoCode.placeholder = promoCodeObject.name;
    window.alert("Promo code applied successfully!");
    addItemToHtml();
}

function isValidPromoCodes(promoCode) {
    let validPromoCodes = [...tierPromoCodes, ...gameVoucherPromoCodes].map((promo) => promo.name);
    return validPromoCodes.includes(promoCode);
}

function getPromoCodeObject(promoCode) {
    if (tierPromoCodes.map((promo) => promo.name).includes(promoCode)) {
        return tierPromoCodes.find((promo) => promo.name === promoCode);
    } else if (gameVoucherPromoCodes.map((promo) => promo.name).includes(promoCode)) {
        return gameVoucherPromoCodes.find((promo) => promo.name === promoCode);
    }
}