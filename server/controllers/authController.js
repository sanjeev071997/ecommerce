import crypto from "crypto";
import User from "../models/user.js";
import sendToken from "../utils/jwtToken.js";
import Errorhandler from "../utils/Errorhandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import logger from "../config/logger.js";
import sendEmail from "../utils/sendEmail.js";
import forgotPasswordEmail from "../utils/forgotPasswordEmail.js";

// User Registration
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new Errorhandler("Email already registered", 400));
  }
  try {
    // Create a new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// user login
export const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const escapeRegex = (text) =>
      text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const normalizedEmail = escapeRegex(email.toLowerCase());

    // Find the user by email (case-insensitive) and ensure the account is active
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
    }).select("+password");

    if (!user) {
      return next(new Errorhandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new Errorhandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// // user profile (Get User Details)
export const profileDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return next(new Errorhandler("User not found!", 404));
    }
    res.status(200).json({
      success: true,
      user,
      message: "User info fetched successfully",
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// user profile update
export const profileUpdate = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// user profile update password
export const profileUpdatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new Errorhandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new Errorhandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
};

// user forgot password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.email) {
    return next(new Errorhandler("Please Enter Your Email", 400));
  }
  
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  // Get ResetPassword Token
  let resetToken;
  if (typeof user.getResetPasswordToken === "function") {
    resetToken = user.getResetPasswordToken();
  } else {
    return next(
      new Errorhandler(
        "Reset password token function not available for this user",
        500
      )
    );
  }

  await user.save({ validateBeforeSave: false });

  // Html To Send Email Template
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const currentYear = new Date().getFullYear();
  const userName = user?.name
  const html = forgotPasswordEmail(resetPasswordUrl, currentYear, userName);

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      html,
    });

    res.status(200).json({
      success: true,
      message: `Sending to ${
        user.email 
      } email successfully. Please check your email.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});

// user reset password (confirm password)
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    // Creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    let user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new Errorhandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return next(new Errorhandler("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    logger.error(error);
    return next(new Errorhandler(error.message, 500));
  }
});
