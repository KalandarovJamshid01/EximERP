const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
  name: String,
});

const Role = mongoose.model("roles", roleSchema);
module.exports = Role;
