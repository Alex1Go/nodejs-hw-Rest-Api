const express = require("express");
const {
  getAllContacts,
  getOneContact,
  newOneContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactControllers");

const router = express.Router();
const jsonParser = express.json();

router.get("/", getAllContacts);
router.get("/:contactId", getOneContact);
router.post("/", jsonParser, newOneContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", jsonParser, updateContact);
router.patch("/:contactId/favorite", jsonParser, updateStatusContact);

module.exports = router;
