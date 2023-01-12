const express = require("express");
const path = require("path");
const morgan = require("morgan");
const auth = require("./route/auth.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use("/api/v1/auth", auth);

module.exports = app;
