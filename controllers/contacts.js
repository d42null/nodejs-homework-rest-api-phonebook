const contacts = require("../models/contacts");
const HttpError = require("../utils/HttpError");
const cntrlErrorDecorator = require("../utils/cntrlErrorDecorator");
const listContacts = async (req, res) => {
  res.json(await contacts.listContacts());
};
const getContactById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};
const removeContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json({ message: "contact deleted" });
};
const addContact = async (req, res) => {
  res.status(201).json(await contacts.addContact(req.body));
};
const updateContact = async (req, res) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};
module.exports = {
  listContacts: cntrlErrorDecorator(listContacts),
  getContactById: cntrlErrorDecorator(getContactById),
  removeContact: cntrlErrorDecorator(removeContact),
  addContact: cntrlErrorDecorator(addContact),
  updateContact: cntrlErrorDecorator(updateContact),
};
