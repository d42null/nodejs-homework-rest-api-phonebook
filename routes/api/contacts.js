const express = require("express");
const cntrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const contactsSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", cntrl.listContacts);

router.get("/:contactId", cntrl.getContactById);

router.post("/", validateBody(contactsSchema), cntrl.addContact);

router.delete("/:contactId", cntrl.removeContact);

router.put("/:contactId", validateBody(contactsSchema), cntrl.updateContact);

module.exports = router;
