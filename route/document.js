const router = require("express").Router();
const document = require("./../controller/document");
const upload = require("./../controller/fileUpload");
router.route("/").post(
  upload.single("file"),
  document.addDocument
);
// router
//   .route("/:id")
//   .get(document.getOne)
//   .delete(document.deletedocument)
//   .patch(document.update);
module.exports = router;
