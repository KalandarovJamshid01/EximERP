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
    TNVED: Boolean,
    sostavleniye_docs: Boolean,
    prochie_docs: String,
    comment: String,
    user_id: {
      type: mongoose.Schema.ObjectId,
    },
    doc_status: {
      type: String,
      enum: ["otklyuchena", "zavershena", "v obrabotke"],
      default: "V obrabotke",
    },
  },
  { timestamps: true }
);
const Document = mongoose.model("documents", docSchema);
module.exports = Document;
