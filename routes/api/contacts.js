const express = require("express");
const cntrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require("../../models/contact");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, cntrl.listContacts);

router.get("/:contactId", authenticate, isValidId, cntrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(addContactSchema),
  cntrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, cntrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  cntrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteContactSchema),
  cntrl.updateStatusContact
);

module.exports = router;
