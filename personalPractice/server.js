const express = require("express");

const app = express();

app.use(express.json());

app.use(require("./src/routes/categoryRoute"));
app.use(require("./src/routes/productRoute"));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
