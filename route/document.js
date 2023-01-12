const router = require("express").Router();
const document = require("./../controller/document");
const multer = require("multer");
const upload = multer({ dest: "./files/" });
const { addFile } = require("./../controller/fileUpload");
router.route("/").post(addFile);
// router
//   .route("/:id")
//   .get(document.getOne)
//   .delete(document.deletedocument)
//   .patch(document.update);
module.exports = router;
