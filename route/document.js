const router = require("express").Router();
const document = require("./../controller/document");
const verify = require("./../verify.js");
router.route("/").post(verify, document.addFile);
router.route("/:doc_file").get(document.downloadFile);
// router
//   .route("/:id")
//   .get(document.getOne)
//   .delete(document.deletedocument)
//   .patch(document.update);
module.exports = router;
