const { Schema, model } = require("mongoose");
const Joi = require("joi");
const mongooseErrorHandler = require("../middlewares/mongooseErrorHandler");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
    verify:{
      type:Boolean,
      default:false,
    },
    verificationToken:{
      type:String,
      required: [true, 'Verify token is required'],      
    }
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", mongooseErrorHandler);
const User = model("user", userSchema);
const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const emailVerificationSchhema=Joi.object({email: Joi.string()
    .pattern(emailRegexp)
    .required()})
  .messages({"any.required":'missing required field email'})
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
module.exports = { User, authSchema, updateSubscriptionSchema ,emailVerificationSchhema};
