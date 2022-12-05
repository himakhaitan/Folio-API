<div id="top"></div>
<p align="center">
<img src="https://badgen.net/github/issues/himakhaitan/Folio-API?style=flat-square&scale=1.4">
&nbsp;
<img alt="node-current" src="https://badgen.net/github/stars/himakhaitan/Folio-API?style=flat-square&scale=1.4">&nbsp;
<img alt="APM" src="https://badgen.net/github/forks/himakhaitan/Folio-API?style=flat-square&scale=1.4">&nbsp;
<img alt="node-current" src="https://badgen.net/github/closed-issues/himakhaitan/Folio-API?style=flat-square&scale=1.4">&nbsp;
<img alt="node-current" src="https://badgen.net/github/license/himakhaitan/Folio-API?style=flat-square&scale=1.4&color=green">
</p>
<h1 align="center">
  <a><img src="https://github.com/himakhaitan/Folio-API/blob/main/ui_pack/folio.png?raw=true" width="150"></a>
  <br>  
  Folio API - Library Management System
  <br>
</h1>

<p align="center">
The API is powered by <a href="https://expressjs.com/">Express.js</a> and helps in the smooth functioning of the Library. This API is used by a Frontend Client in order to perform CRUD operations on the database. The API is hosted on <a href="https://www.render.com/">Render</a> and the database is hosted on <a href="https://www.mongodb.com/">MongoDB Atlas</a>.
</p>

<p align="center">
API is equipped with a variety of routes (POST, GET, DELETE, UPDATE) that can be used to interact with the database in order to perform operations like adding a new book, adding a issuer, deleting a book, issuing a book, retrieving a book, etc.
</p>
</br>

<p align="center">
<img src="https://github.com/himakhaitan/himakhaitan/blob/main/icons/nodejs.png?raw=true" height="60">&nbsp; &nbsp; &nbsp;
<img src="https://github.com/himakhaitan/himakhaitan/blob/main/icons/expressjs.png?raw=true" height="60">&nbsp; &nbsp; &nbsp;
<img src="https://github.com/himakhaitan/himakhaitan/blob/main/icons/mongo.png?raw=true" height="60">&nbsp; &nbsp; &nbsp;
<img src="https://github.com/himakhaitan/himakhaitan/blob/main/icons/js.png?raw=true" height="60">
</p>

<img src="https://github.com/himakhaitan/Folio-API/blob/main/ui_pack/banner.png?raw=true">

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#routes">Routes</a>
    <ul>
      <li><a href="#add-routes">Add Routes</a></li>
      <li><a href="#auth-routes">Auth Routes</a></li>
      <li><a href="#data-routes">Data Routes</a></li>
      <li><a href="#delete-routes">Delete Routes</a></li>
      <li><a href="#issue-routes">Issue Routes</a></li>
    </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

<p>This project is an API (Application Programming Interface) powered by <a href="https://expressjs.com/">Express JS</a>. Different Routes can be used to perfrom different set of predefined CRUD operations on the MongoDB Database.</p>

The API may serve several **API Clients** to serve their purpose. API is capable of maintating Inventory of the Library and manage other chores such as Issuing a Book & Taking it back.

Ofcourse, the API doesn't serve for many day-to-day operations required for Library Management. You may check-out my Roadmap for API <a href="#roadmap">here</a>. You may also suggest changes or new features by creating a new issue <a href="https://github.com/himakhaitan/Folio-API/issues">here</a>.

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

Below is the list of all the major frameworks and libraries used in the project.

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Prerequisites

The prerequisites for the API server to run are the following:

- Node.js (v16.16.0 or higher)
- MongoDB (Locally or Cloud)
- and you are good to go!

<p align="right">(<a href="#top">back to top</a>)</p>

## Routes

### Add Routes

| Route           | Method | Description   | Params                                                             | Response                                           | Access           |
| --------------- | ------ | ------------- | ------------------------------------------------------------------ | -------------------------------------------------- | ---------------- |
| /api/add/book   | POST   | Add a Book    | title: String, genre: ObjectID, author: ObjectID,                  | book: Object, success: Boolean, message: String,   | admin & employee |
| /api/add/author | POST   | Add an Author | firstName: String, lastName: String                                | author: Object, success: Boolean, message: String, | admin & employee |
| /api/add/user   | POST   | Add a User    | firstName: String, lastName: String, email: String, regNo: String, | user: Object, success: Boolean, message: String,   | admin & employee |
| /api/add/genre  | POST   | Add a Genre   | name: String                                                       | genre: Object, success: Boolean, message: String,  | admin & employee |

### Auth Routes

| Route          | Method | Description       | Params                                            | Response                                         | Access |
| -------------- | ------ | ----------------- | ------------------------------------------------- | ------------------------------------------------ | ------ |
| /auth/register | POST   | Registering Admin | username: String, email: String, password: String | admin: Object, message: String, success: Boolean | admin  |
| /auth/login    | POST   | Loggin In User    | username: String, password: String                | jwt: String,message: String, success: Boolean    | Public |

### Data Routes

| Route                       | Method | Description                              | Params        | Response                                          | Access                  |
| --------------------------- | ------ | ---------------------------------------- | ------------- | ------------------------------------------------- | ----------------------- |
| /api/data/author/id/:id     | GET    | Fetch Author by ID                       | id: String    | author: Object, message: String, success: Boolean | admin, employee, common |
| /api/data/book/id/:id       | GET    | Fetch Book by ID                         | id: String    | book: Object, message: String, success: Boolean   | admin, employee, common |
| /api/data/book/:slug        | GET    | Fetch Book by Slug                       | slug: String  | book: Object, message: String, success: Boolean   | admin, employee, common |
| /api/data/genre/id/:id      | GET    | Fetching Books of a Genre with Object ID | id: String    | genre: Object, message: String, success: Boolean  | admin, employee, common |
| /api/data/genre/:slug       | GET    | Fetching Books of a Genre with Slug      | slug: String  | genre: Object, message: String, success: Boolean  | admin, employee, common |
| /api/data/user/id/:id       | GET    | Get a User by Object ID                  | id: String    | user: Object, message: String, success: Boolean   | admin & employee        |
| /api/data/user/regNo/:regNo | GET    | Get a User by Registration Number        | regNo: String | user: Object, message: String, success: Boolean   | admin & employee        |

### Delete Routes

| Route                | Method | Description         | Params     | Response                          | Access |
| -------------------- | ------ | ------------------- | ---------- | --------------------------------- | ------ |
| /api/delete/book/:id | DELETE | Delete a Book by ID | id: String | message: String, success: Boolean | admin  |
| /api/delete/user/:id | DELETE | Delete a User by ID | id: String | message: String, success: Boolean | admin  |

### Issue Routes

| Route             | Method | Description     | Params                        | Response                                                                             | Access           |
| ----------------- | ------ | --------------- | ----------------------------- | ------------------------------------------------------------------------------------ | ---------------- |
| /api/issue/add    | POST   | Issue a Book    | book: ObjectID, regNo: String | success: Boolean, message: String, book: ObjectID, regNo: String, issuedTo: ObjectID | admin & employee |
| /api/issue/remove | POST   | Retrieve a Book | book: ObjectD                 | book: ObjectID, user: ObjectID, success: Boolean, message: String                    | admin & employee |

## Contact

<p>Feel free to reach me out on any of the above mediums (LinkedIn, Mail and Twitter for fast responses). See you in my inbox / DMs 📩 😃</p>

<p>
  <a href="mailto:himanshukhaitan108@gmail.com" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/mail.png?raw=true"></a>
  <a href="https://www.linkedin.com/in/himakhaitan" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/linkedin.png?raw=true"></a>&nbsp;&nbsp;<a href="https://himakhaitan.medium.com/" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/medium.png?raw=true"></a>&nbsp;&nbsp;
  <a href="https://twitter.com/hima_khaitan" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/twitter.png?raw=true"></a>&nbsp;&nbsp;
  <a href="https://www.instagram.com/himakhaitan/" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/insta.png?raw=true"></a>&nbsp;&nbsp;<a href="https://dev.to/hima_khaitan" target="_blank"><img height="40" src = "https://github.com/himakhaitan/himakhaitan/blob/main/icons/dev.png?raw=true"></a>
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

> Hapilly turning Coffee into Code ☕️ 💻
