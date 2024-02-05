# Project Overview [aprodité]
> [!NOTE]
> Topic 1: E-Commerce

Welcome to our one-stop beauty shop! Our website offers skincare solutions for people of different ages, genders, ethnicities, and backgrounds. Whether you're a trendsetting woman, a modern man who values grooming necessities, a beauty-conscious young adult, or someone in their elderly years, we've got something for everyone.

We take pleasure in making beauty accessible to everyone by providing high-quality items at reasonable prices. To sweeten the deal, We'll launch an engaging shopping experience complete with gamification features because your beauty routine should be not just effective but also enjoyable! Through the game, users will have to match items to the specific groups, then answer a few questions, they will then be prompt with a voucher code that they can use, else it will display “Try better next time”. Join us on this beauty journey where affordability meets innovation, and each purchase leads to a more radiant you.

## Design Process

As consumers of many different kinds of beauty products whether it be makeup, skincare, and nailcare. We understand the excitement and dedication that comes with taking care of our own skin's health. While designing aprodité's website, our primary focus was to create an immersive and user-friendly platform tailored specifically for Young Adults, Working Adults, Men, Women, or anyone that loves to care for their skin. The goal was to provide a one-stop  destination where wsers could easily explore, discover, and purchase skincare products that helps to benefit and enhance their skin. 

User Stories:

    • As a young adult with acne concerns, I want informative content and products for clearer skin.

    • As a frequent traveler, I want travel-sized skincare options for on-the-go convenience.

    • As someone seeking gender-neutral products, I want skincare options designed for all without stereotyping.

    • As a teenager navigating puberty, I want skincare solutions to manage hormonal changes and acne.

    • As a person with a skin condition exacerbated by stress, I want calming skincare routines for stress management.

    • As a person with a busy social life, I want skincare products that provide a quick and refreshing pick-me-up.

    • As a person with a history of skin sensitivity, I want skincare products with a focus on soothing ingredients.

aprodité is designed to cater to these user stories by delivering an aesthetically beautiful, well-organized website with easy navigation. Our platform provides a varied selection of high-quality skincare products, as well as helpful material to help you along your skincare journey. Devoted to satisfying our users' needs and interests, aprodité aspires to be the chosen destination for individuals seeking authentic and practical skincare solutions that combine elegance and efficacy.

| Hex             | Color                                                              |
| --------------- | ------------------------------------------------------------------ |
| #EDF3E9 | ![#edf3e9](https://via.placeholder.com/10/edf3e9?text=+) |
| #C0D9C2 | ![#c0d9c2](https://via.placeholder.com/10/c0d9c2?text=+) |
| #808077 | ![#808077](https://via.placeholder.com/10/808077?text=+) |
| #88B2AA | ![#88b2aa](https://via.placeholder.com/10/88b2aa?text=+) |


## Features

#### Existing Feature(s):
    - [ ] Pop-Up Overlay – a pop-up that lets the user know about a game that they can earn vouchers from.
    - [ ] Quantity Button – lets the user adjust the amount of quantity they would like.
    - [ ] Add to Cart – lets the user add the product to cart.
    - [ ] Product – allows user to click on product to see more about the product.
    - [ ] Account Overlay – allows user to logout.
    - [ ] Shopping Cart – allow them to finalize their order, remove any product they don’t want.
    - [ ] Check Out Button - allows the users to check out their order.

## Technologies Used

- [Visual Code Studio Software](https://visualstudio.microsoft.com)
    - Visual Code Studio is used to help me code out my entire website from scratch.
- [Adobe XD](https://www.adobe.com/sg/products/xd/learn/get-started/what-is-adobe-xd-used-for.html)
    - Adobe XD is used to help me design out my wireframes to showcase what my website is suppose to look like.
- [Adobe Photoshop](https://www.adobe.com/products/photoshop.html)
    - Adobe XD is used to help me design my product images, or banner and logos in my websites.
- [HTML](https://www.w3schools.com/whatis/whatis_html.asp)
    - HTML is used to structure the web pages and its' contents.
- [CSS](https://www.w3schools.com/css/css_intro.asp#:~:text=CSS%20is%20used%20to%20define,different%20devices%20and%20screen%20sizes.)
    - CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
    -  Javascript is used for to allow me to implement complex features on my web pages to make the website more functional.
- [RestDB API](https://restdb.io)
    - RestDB API is used to allow me to store my customer information from my website into the database, at the same time, i can fetch it to be used for things like tier etc.

## Testing

#### General:
    i. Navigation Bars are all linked properly and are able to access each other in any of the pagess.
    ii. All linked websites are working and able to be opened from either the navigation bar or footer.
        • Internal Links: Opened within the current page and no new tab.
        • External Links: Opened in a new tab.
    iii. Back to top button in every page can jump back to the top of the page.
    iv. Account dropdown is shown when clicked on, able to logout from there.
    v. Once out of view of navigatin bar, you can scroll down to make the alternate navigation bar appear.

    Problems/Bugs:
    i. Shopping Cart is not displayed in mobile view.

#### Login/Register Page: [login.html] & [register.html]

    i. Try to press enter after filling in email or passwords, there should be "Invalid Email or Password" appearing.
    ii. Password will appear as dots while you types in their password to be more private.
    iii. Create an Account first in **register.html**, you will then be able to login using ur email and password in **login.html**.

#### Home/Landing Page: [index.html]

    i. There is a preloader (lottie animation) loading screen as the main content loads.
    ii. A pop-up will appear upon landing on the page, able to cancel.
    iii. There is a slideshow of banners, that showcases any promotion etc (One of them is a game, can be clicked upon to be brought to the game menu).
    iv. As you scroll through the page, each section will load up.

#### Shop Page: [shop.html]

    i. Filtering Option are working and able to filter via "All Products", "Newest", "Face" & "Hair & Body" .
    ii. All products are able to be added into the shopping bag/cart, able to adjust quantity, the total is also calculated correctly no matter the quantity.
    iii. Search Bar is working and is able to search items by their names.
    iv. Some of the items are linked to their own product pages, and is working.
    v. Users are able to check out their items when they click "Check Out" in the shopping cart.

#### About Page: [about.html]

    i. Company employees' socials can all be accessed, and will be brought to a new tab.

#### Contact Us Page: [contactus.html]

    i. Try to submit the empty form and verify that an error message that says "Please enter a message with at least 10 characters" has popped up.
    ii. Try to submit the form filled with content and verify that a message that says "Submitted Successfully! We will get back to you in 24-48 hours! :)" has popped up.
    iii. Type an invalid email address and hover over it, a message that says "Please include @ in the email address" appears.
    iv. All socials linked will open a new tab upon clicked.
    v. Google Map is able to be shift around.
    
    Problems/Bugs: 
    i. When sending an invalid email address but with a message >10 characters, the form is still able to be submitted.

#### Shop Page: [shop.html]

## Credits

Content/Media:
- [Lottie Animation](https://lottiefiles.com) - index.html
    - Made my own custom Company lottie.
- [Logo] | [Banners/Ambassador Images] | [Product Images]
    - Custom made using Photoshop.

Coding Help:
- [w3schools](https://www.w3schools.com)
