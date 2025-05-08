import express from "express";
import {
  register,
  login,
  logout,
  profileDetails,
  profileUpdate,
  profileUpdatePassword,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  profileUpdatePasswordValidation,
  resetPasswordValidation,
} from "../helpers/authHelpers.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/logout", logout);
router.get("/profile", isAuthenticatedUser, profileDetails);
router.put("/profile/update", isAuthenticatedUser, profileUpdateValidation, profileUpdate);
router.put("/profile/update/password", isAuthenticatedUser, profileUpdatePasswordValidation, profileUpdatePassword);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPasswordValidation, resetPassword);

export default router;
