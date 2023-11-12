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

router.get("/", getAllContacts);
router.get("/:contactId", getOneContact);
router.post("/", newOneContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
