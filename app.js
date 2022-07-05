require("dotenv/config");
require("./db");


const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "new-app";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index); 

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes); 


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;