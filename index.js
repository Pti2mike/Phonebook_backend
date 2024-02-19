const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Hello Phonebook backend !</h1>");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
