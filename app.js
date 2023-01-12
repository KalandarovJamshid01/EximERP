const express = require("express");
const path = require("path");
const morgan = require("morgan");

const cors = require("cors");
const app = express();




app.use(cors());


app.use(morgan("dev"));








module.exports = app;

