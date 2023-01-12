const mongoose = require("mongoose");
const result_doc_Schema = mongoose.Schema(
  {
    document_id: {
      type: mongoose.Schema.ObjectId,
    },
    file: String,
    comment: String,
  },
  { timestamps: true }
);

const Result = mongoose.model("results", result_doc_Schema);
module.exports = Result;
