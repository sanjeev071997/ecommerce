import ErrorHandler from "../utils/errorhandler.js";

// Register Validation
export const registerValidation = (req, res, next) => {
  const { name, email, phone, password } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please Enter Your Full Name", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Please Enter Your Email", 400));
  }
  if (!phone) {
    return next(new ErrorHandler("Please Enter Your Phone Number", 400));
  }
  // if (!instituteId) {
  //   return next(new ErrorHandler("Please Enter Your Institute Id", 400));
  // }
  if (!password) {
    return next(new ErrorHandler("Please Enter Your Password", 400));
  }

  if (name.length < 3) {
    return next(
      new ErrorHandler(
        `${name} - Full Name should have more than 3 characters`,
        403
      )
    );
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return next(new ErrorHandler(`${email} - is not a valid email`, 403));
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(req.body.phone)) {
    return next(
      new ErrorHandler(
        `${req.body.phone} - Invalid phone number format. Please use 998XXXXXXX this format.`,
        403
      )
    );
  }

  // Password validation
  const pattern = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
  if (!pattern.test(password)) {
    return next(
      new ErrorHandler(
        `Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long`,
        403
      )
    );
  }

  next();
};

// Login Validation
export const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new ErrorHandler("Please Enter Your Email", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Please Enter Your Password", 400));
  }

  next();
};

// Profile Update Validation
export const profileUpdateValidation = (req, res, next) => {
  if (req.body.name.length < 3 || req.body.studentName < 3) {
    return next(
      new ErrorHandler(
        `${req.body.name} - Full Name should have more than 3 characters`,
        403
      )
    );
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(req.body.email)) {
    return next(
      new ErrorHandler(`${req.body.email} - is not a valid email`, 403)
    );
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(req.body.phone)) {
    return next(
      new ErrorHandler(
        `${req.body.phone} - Invalid phone number format. Please use 998XXXXXXX this format.`,
        403
      )
    );
  }

  next();
};

// Profile Update Password Validation
export const profileUpdatePasswordValidation = (req, res, next) => {
  if (!req.body.oldPassword) {
    return next(new ErrorHandler("Please enter an old password", 403));
  }

  if (!req.body.newPassword) {
    return next(new ErrorHandler("Please enter an new password", 403));
  }

  if (!req.body.confirmPassword) {
    return next(new ErrorHandler("Please enter an confirm password", 403));
  }
  // newPassword validation
  const pattern = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
  if (!pattern.test(req.body.newPassword)) {
    return next(
      new ErrorHandler(
        `Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long`,
        403
      )
    );
  }
  next();
};

// Reset Password (confirm password) Validation
export const resetPasswordValidation = (req, res, next) => {
  if (!req.body.password) {
    return next(new ErrorHandler("Please enter new password", 400));
  }

  if (!req.body.confirmPassword) {
    return next(new ErrorHandler("Please enter confirm password", 400));
  }

  next();
};
