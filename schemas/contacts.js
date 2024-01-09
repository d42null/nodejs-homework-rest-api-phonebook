const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .messages({ "string.pattern.base": `Phone number is not valid` })
    .required(),
});
module.exports = contactsSchema;
