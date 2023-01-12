const mongoose = require("mongoose");
const docStatusSchema = mongoose.Schema({
  name: String,
});

const DocStatus = mongoose.model("docStatuses", docStatusSchema);
module.exports = DocStatus;
