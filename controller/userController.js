import { catchAsyncErrors } from "./../middlewares/catchAsyncErrors.js";
import ErrorHandler from "./../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

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
  res.status(200).json({
    success: true,
    message: "User registered successfully.",
  });
});


