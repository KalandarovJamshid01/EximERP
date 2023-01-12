const router = require("express").Router();
const res_doc = require("./../controller/result_doc");
const verify = require("./../verify.js");
router.route("/:id").post(verify, res_doc.addFile);
router.route("/:doc_file").get(res_doc.downloadFile);
router.route("/:id").get(res_doc.getResDoc);
module.exports = router;
