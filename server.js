const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
