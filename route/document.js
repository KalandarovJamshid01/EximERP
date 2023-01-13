const router = require("express").Router();
const document = require("./../controller/document");
const verify = require("./../verify.js");
router.route("/").get(document.get_all_doc).post(verify, document.addFile);
router.route("/download/:doc_file").get(document.downloadFile);
router.route("/:id").get(document.get_one_document);
module.exports = router;
