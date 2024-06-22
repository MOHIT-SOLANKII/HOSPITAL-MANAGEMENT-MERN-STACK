import { catchAsyncErrors } from "./../middlewares/catchAsyncErrors.js";
import ErrorHandler from "./../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  // Capturing the input filled by user
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;

  //Checking if any field is empty
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }

  //If the form is filled properly ,Checking if given email is already registered in a database
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already registered.", 400));
  }

  //If the form is filled properly and also provived email is unique ,registering/creating new data in database
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });
   /* res.status(200).json({
    success: true,
    message: "User registered successfully.",
  });*/

  generateToken(user, "User registered successfully.", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials.", 400));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials.", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with given role not found.", 400));
  }

  /* res.status(200).json({
    success: true,
    message: "User Logged In successfully.",
  });*/

  generateToken(user, "User logged in successfully.", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

