const data = require("./../../sql3-data");

module.exports = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const parsedBody = new URLSearchParams(body);
    const name = parsedBody.get("name");
    const age = parsedBody.get("age");

    if (name && age) {
      const user = { name, age: parseInt(age) };
      const createdUser = await data.createUser(user);
      res.writeHead(201);
      res.end(JSON.stringify(createdUser));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Error on question" }));
    }
  });
};
