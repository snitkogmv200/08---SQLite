const http = require("http");
const requestHandler = require("./routes/router.js");

const server = http.createServer(requestHandler);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started PORT: ${PORT}`);
});
