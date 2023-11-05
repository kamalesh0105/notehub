const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");

//routing user operations
router.route("/").get(usercontroller.getAllUsers);
router.route("/create").post(usercontroller.createNewUsers);
router.route("/update").patch(usercontroller.updateUser);
router.route("/delete").delete(usercontroller.deleteUser);

module.exports = router;
