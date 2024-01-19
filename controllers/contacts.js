const HttpError = require("../utils/HttpError");
const { Contact } = require("../models/contact");
const cntrlErrorDecorator = require("../utils/cntrlErrorDecorator");
const listContacts = async (req, res) => {
  res.json(await Contact.find());
};
const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};
const removeContact = async (req, res) => {
  if (!(await Contact.findByIdAndDelete(req.params.contactId)))
    throw HttpError(404, "Not Found");
  res.json({ message: "contact deleted" });
};
const addContact = async (req, res) => {
  res.status(201).json(await Contact.create(req.body));
};
const updateContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};
module.exports = {
  listContacts: cntrlErrorDecorator(listContacts),
  getContactById: cntrlErrorDecorator(getContactById),
  removeContact: cntrlErrorDecorator(removeContact),
  addContact: cntrlErrorDecorator(addContact),
  updateContact: cntrlErrorDecorator(updateContact),
  updateStatusContact: cntrlErrorDecorator(updateStatusContact),
};
