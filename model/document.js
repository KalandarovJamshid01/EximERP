const mongoose = require("mongoose");
const docSchema = mongoose.Schema(
  {
    tip_procedure: String,
    tip_rejim: String,
    transport_nakladnoy: String,
    invoys: String,
    upakovicniy_list: String,
    kontrakt: String,
    sertifikat_proisxojdeniye: String,
    dopolnitelniy_docs: String,
    foto_tovar: String,
    TNVED: String,
    sostavleniye_docs: String,
    prochie_docs: String,
    comment: String,
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: users,
    },
    doc_status_id: {
      type: mongoose.Schema.ObjectId,
      ref: docStatuses,
    },
  },
  { timestamps: true }
);
const Document = mongoose.model("documents", docSchema);
module.exports = Document;
