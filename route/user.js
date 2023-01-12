const router = require("express").Router();
const user = require("./../controller/user");
router.route("/").get(user.getAll).post(user.add);
router
  .route("/:id")
  .get(user.getOne)
  .delete(user.deleteUser)
  .patch(user.update);
module.exports = router;
