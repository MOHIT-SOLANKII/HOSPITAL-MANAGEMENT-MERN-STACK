import { catchAsyncErrors } from "./../middlewares/catchAsyncErrors.js";
import ErrorHandler from "./../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// ** New patient registration functionality

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

// ** Login functionality

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

  generateToken(user, `${user.role} logged in successfully .`, 200, res);
});

// ** Adding new admin functionality

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

// ** Getting all doctors functionality

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// ** Getting user functionality

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// ** Admin logout functionality

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged out successfully.",
    });
});

// ** res.cookie(name, finalValue, [options])
// ** Common Options:
// ** domain (String): The domain for which the cookie is valid. Defaults to the domain of the app.
// ** expires (Date): The expiration date of the cookie. If not set, the cookie becomes a session cookie and is deleted when the browser is closed.
// ** httpOnly (Boolean): Flags the cookie to be accessible only by the web server. Defaults to false.
// ** maxAge (Number): Convenient option to set the expiration time in milliseconds from the current time.
// ** path (String): The URL path for which the cookie is valid. Defaults to '/'.
// ** secure (Boolean): Marks the cookie to be used with HTTPS only. Defaults to false.
// ** sameSite (Boolean or String): Controls whether the cookie is sent with cross-site requests. Possible values are 'strict', 'lax', or true (equivalent to 'strict').

// ** Patient logout functionality

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged out successfully.",
    });
});

// ** Adding new doctor functionality

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar is required.", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("Invalid file format.", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email.`,
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error :",
      cloudinaryResponse.error || "Unknown cloudinary error."
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New doctor registered.",
    doctor,
  });
});
