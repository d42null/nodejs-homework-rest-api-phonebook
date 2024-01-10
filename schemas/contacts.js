const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .message("Phone number is not valid")
    .required(),
});
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .message("Phone number is not valid"),
})
  .min(1)
  .message("missing fields");
module.exports = {
  addContactSchema,
  updateContactSchema,
};
