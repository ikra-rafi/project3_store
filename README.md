# Spice-A-Holic

Spice-A-holic is an e-commerce application designed to act as a storefront selling spices, extracts and teas.   Spice-A-holic allows a user to signup for an account to get a discount on their orders which is only applied when logged in.   A user (whether logged in or not) can add items to their shopping cart by browsing the store front.  The shopping cart page permits the user to increase or decrement the quantity of the products in their cart.  They can even remove items from their cart if necessary.   When ready to place an order they click the Checkout button on the shopping cart page.  On the checkout page, the user is able to enter their shipping information, billing information and credit card info.  There is also a checkbox that permits them to claim the billing address is the same as shipping information for less data entry.  Upon review of their cart total, the user can click the Place Order button.   Their shopping cart items are now deleted and an order created.

If a user is logged in to the site, they can view their order history.  In addition, as a logged in user adds items to their shopping cart they are able to review a spice and post a rating/comment about that product.  This feature is not available unless logged in to the site.

An admin user of the site is enabled access to the Add Products page and Admin page.   The Admin page allows an admin user to basically change inventory quantity as products sell out.  The Add Products page permits an admin user to add a new spice/tea/extract to the database of products.  They are also permitted to upload a photo of the product that is then stored in the cloud.  

This project demonstrates a full front end and back end application utilizing React and a noSQL database.  All 4 CRUD operations are supported in this application.  It utilizes node.js and an express server for the back end while the front end utilized React and bootstrap framework.  The project structure follows the MVC.  A mongo database was incorporated.  The application was deployed to Heroku and used the mongo Atlas cloud database.  The application also utilized authentication of users for certain pages and hashing of the password, credit card number and security code.

New technologies incorporated into this project that the team had not used before include:   google maps react, emailjs, react star ratings, swiper, react meta tags and react hook form.

## Table of Contents
* [Project Diagram](#Project-Diagram)
* [Entity Relationship Diagram](#ERD)
* [Screenshots](#Screenshots)
* [Installation](#Installation)
* [Usage](#Usage)
* [Support](#Support)
* [Technologies](#Technologies)
* [Repository](#Repository)
* [Deployment](#Deployment)

## Project-Diagram
![Project Diagram](./public/assets/project_diagram.PNG)

## Screenshots
* [Home Page](#Home-Page)
* [Login](#Login)
* [Registration](#Registration)
* [User Landing](#User-Landing)
* [Display Pets](#Display-Pets)
* [Display Pet Info](#Display-Pet-Info)
* [Donate Pet](#Donate-Pet)
* [General Donations](#General-Donations)
* [Update User Registration](#Update-User-Registration)

#### Home Page
The following is a screenshot of the Spice-A-holic application home page.

<p align="center">
  <img src="./public/assets/SpiceAHolicHomePage.png" alt="Spice-A-Holic application home screen">
</p>

#### Login
The following is a screenshot of the login/signup page.

<p align="center">
  <img src="./public/assets/SpiceAHolicLogin.png" alt="Spice-A-Holic application login screen">
</p>

#### Registration
The following is a screenshot of the registration page.

<p align="center">
  <img src="./public/assets/SpiceAHolic.png" alt="Spice-A-Holic application registration screen">
</p>

#### Product Details
The following is a screenshot of the product details page for a spice.

<p align="center">
  <img src="./public/assets/SpiceAHolicProductDetails.png" alt="Spice-A-Holic application product detail screen">
</p>

#### Shopping Cart
The following is a screenshot of the shopping cart page.

<p align="center">
  <img src="./public/assets/SpiceAHolicShoppingCart.png" alt="Spice-A-Holic application shopping cart screen">
</p>

#### Checkout
The following is a screenshot of the checkout page.

<p align="center">
  <img src="./public/assets/SpiceAHolicCheckout.png" alt="Spice-A-Holic application checkout screen">
</p>

#### Add Products
The following is a screenshot of the add product page.

<p align="center">
  <img src="./public/assets/SpiceAHolicAddProducts.png" alt="Spice-A-Holic application add product screen">
</p>

#### Order History
The following is a screenshot of the order history page.

<p align="center">
  <img src="./public/assets/SpiceAHolicOrderHistory.png" alt="Spice-A-Holic application order history screen">
</p>

#### Admin
The following is a screenshot of the admin page.

<p align="center">
  <img src="./public/assets/SpiceAHolicAdmin.png" alt="Spice-A-Holic application admin screen">
</p>

## Installation

* Fork or clone the repo.
* Make sure to install all the dependencies by running the following command:
    * **npm install**

## Usage

To use this application once installed, the user launches the application from a terminal window as follows:

**npm start**

This will then open a browser window at localhost:3000.

The application can alternatively be run as a deployed application following the link in the Deployment section.

## Support

Please email any of the following team member for further information:

1.  **Ashley Stith**: email: ashleyc.stith@gmail.com; Github: https://github.com/stithac
2.  **Ikra Rafia**: email: irafi@nlihc.org; Github: https://github.com/ikra-rafi
3.  **Luna Shuqair**: email: luna.shuqair89@gmail.com; Github: https://github.com/LShuqair
3.  **John Toth**: email: jtoth7824@gmail.com; Github: https://github.com/jtoth7824

## Technologies

* CSS Framework: Bootstrap
* Server: Express
* Database: mongo
* Additional packages:
    * Cloudinary (upload spice photos)
    * passport (user accounts and authentication)
    * mongoose
    * bcrypt (hashing)
    * react hook form (utilized for some of the user entry forms)
    * react star ratings (utilized for user reviews of spices)
    * google map react
    * react meta tags
    * swiper
    * emailjs

## Repository

Direct link to repository:  https://github.com/ikra-rafi/project3_store

## Deployment

The Spice-A-Holic application was deployed to Heroku so that anyone can run the application.   The link to execute the application is as follows:

https://spiceaholic.herokuapp.com/


[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://www.mit.edu/~amini/LICENSE.md)