const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  (err) => {
    if (!err) console.log("db connected");
    else console.log(err);
  }
);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
