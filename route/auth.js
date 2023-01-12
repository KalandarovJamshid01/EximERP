const router = require("express").Router();
const auth = require("./../controller/auth");
router.route("/register").post(auth.register);
router.route("/login").post(auth.login);
module.exports = router;
