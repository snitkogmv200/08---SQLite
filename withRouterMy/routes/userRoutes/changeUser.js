const data = require("./../../sql3-data");

module.exports = (req, res) => {
  const id = req.url.split("/")[2];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const parsedBody = new URLSearchParams(body);
    const updatedData = {};

    parsedBody.forEach((value, key) => {
      updatedData[key] = key === "age" ? parseInt(value) : value;
    });

    const changeUser = await data.changeUser(id, updatedData);

    if (changeUser) {
      res.writeHead(201);
      res.end(JSON.stringify(changeUser));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Error on question" }));
    }
  });
};
