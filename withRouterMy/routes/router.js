const url = require("url");
const userRoutes = require("./userRoutes/userRoutes.js");

const routerHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === "/users" || path.startsWith("/users/")) {
    userRoutes(req, res);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Error" }));
  }
};

module.exports = routerHandler;
