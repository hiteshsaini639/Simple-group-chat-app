const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
let username;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res, next) => {
  res.send(
    '<html><head><title>Chating app</title></head><body><h1>Login!</h1><form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/logged-in" method="POST"><input id="username" name="username" type="text"><br><button id="btn" type="submit" >Login</button></form></body></html>'
  );
});

app.post("/logged-in", (req, res, next) => {
  username = req.body.username;
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  let content = fs.readFileSync(process.cwd() + "/" + "message.txt").toString();
  res.send(
    `<h1>Chat...</h1><p>${content}</p><form action="/save" method="POST"><input id="msg" name="${username}" type="text"><br><button type="submit" >Send</button></form>`
  );
});

app.post("/save", (req, res, next) => {
  let name = Object.keys(req.body);
  username = name;
  fs.appendFile("message.txt", `${name}: ${req.body[name]},  `, function (err) {
    if (err) throw err;
  });
  res.redirect("/");
});

app.listen(3000);
