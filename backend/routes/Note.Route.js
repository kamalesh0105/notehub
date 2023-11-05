const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.route("/").get(notesController.getAllNotes);
router.route("/create").post(notesController.createNewNote);
router.route("/update").patch(notesController.updateNote);
router.route("/delete").delete(notesController.deleteNote);

module.exports = router;
