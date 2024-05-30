const url = require("url");
const data = require("./../../sql3-data");

const getUser = require("./getUser");
const getUsers = require("./getUsers");
const createUser = require("./createUser");
const changeUser = require("./changeUser");
const deleteUser = require("./deleteUser");

const userRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  if (path === "/users" && method === "GET") {
    getUsers(req, res);
  } else if (path.startsWith("/users/") && method === "GET") {
    getUser(req, res);
  } else if (path === "/users" && method === "POST") {
    createUser(req, res);
  } else if (path.startsWith("/users/") && method === "PUT") {
    changeUser(req, res);
  } else if (path.startsWith("/users/") && method === "DELETE") {
    deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Error" }));
  }
};

module.exports = userRoutes;
