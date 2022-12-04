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
    <li><a href="#routes">Routes</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Routes

| Route | Method | Description | Params | Response | Access |
| --- | --- | --- | --- | --- | --- |
| /api/add/book | POST | Add a Book | {
    title: String,
    genre: ObjectID,
    author: ObjectID,
} | {
    book,
    success: true,
    message: String,
} | admin & employee |

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