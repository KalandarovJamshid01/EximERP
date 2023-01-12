const mongoose = require("mongoose");
const docStatusSchema = mongoose.Schema({
  name: String,
},{ timestamps: true });

const DocStatus = mongoose.model("docStatuses", docStatusSchema);
module.exports = DocStatus;
