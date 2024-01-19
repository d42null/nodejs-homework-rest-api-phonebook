const express = require("express");
const cntrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", cntrl.listContacts);

router.get("/:contactId", isValidId, cntrl.getContactById);

router.post("/", validateBody(addContactSchema), cntrl.addContact);

router.delete("/:contactId", isValidId, cntrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  cntrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteContactSchema),
  cntrl.updateStatusContact
);

module.exports = router;
