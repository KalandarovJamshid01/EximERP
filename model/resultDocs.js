const mongoose = require("mongoose");
const result_doc_Schema = mongoose.Schema(
  {
    document_id: {
      type: mongoose.Schema.ObjectId,
      ref: documents,
    },
    file: String,
    comment: String,
  },
  { timestamps: true }
);
