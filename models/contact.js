const { Schema, model } = require("mongoose");
const mongooseErrorHandler = require("../middlewares/mongooseErrorHandler");

const Joi = require("joi");
const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(phoneRegex)
    .message("Phone number is not valid")
    .required(),
  favorite: Joi.boolean(),
}).messages({
  "any.required": `missing required {{#label}} field`,
});
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(phoneRegex).message("Phone number is not valid"),
  favorite: Joi.boolean(),
})
  .min(1)
  .message("missing fields");
const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field favorite",
});
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [emailRegex, "Email address is not valid"],
    },
    phone: {
      type: String,
      match: [phoneRegex, "Phone number is not valid"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", mongooseErrorHandler);
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
};
