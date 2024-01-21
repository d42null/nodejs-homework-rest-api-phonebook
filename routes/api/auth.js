const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const cntrl = require("../../controllers/auth");
const { authSchema, updateSubscriptionSchema } = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateBody(authSchema), cntrl.register);
router.post("/login", validateBody(authSchema), cntrl.login);
router.post("/logout", authenticate, cntrl.logout);
router.get("/current", authenticate, cntrl.current);
router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  cntrl.updateSubscription
);

module.exports = router;
