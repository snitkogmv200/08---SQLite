const express = require("express");
const usersRoutes = require("./src/users/routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
