const express = require("express");
const cntrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const {
  addContactSchema,
  updateContactSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", cntrl.listContacts);

router.get("/:contactId", cntrl.getContactById);

router.post("/", validateBody(addContactSchema), cntrl.addContact);

router.delete("/:contactId", cntrl.removeContact);

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  cntrl.updateContact
);

module.exports = router;
