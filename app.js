const express = require("express");
const path = require("path");
const morgan = require("morgan");
const auth = require("./route/auth.js");
const user = require("./route/user");
const document = require("./route/document");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(morgan("dev"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/document", document);
module.exports = app;
