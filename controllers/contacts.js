const HttpError = require("../utils/HttpError");
const { Contact } = require("../models/contact");
const cntrlErrorDecorator = require("../utils/cntrlErrorDecorator");
const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) filter.favorite = favorite;
  res.json(
    await Contact.find(filter, "-createdAt -updatedAt", { skip, limit })
  );
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
  const { _id: owner } = req.user;
  res.status(201).json(await Contact.create({ ...req.body, owner }));
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
