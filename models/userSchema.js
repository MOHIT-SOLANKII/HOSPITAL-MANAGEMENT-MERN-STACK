import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true /*Automatically removes any leading and trailing whitespace from the firstName value before saving it to the database.*/,
    minLength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String /*Number is not taken because minLength and maxLength validations only comes with String type*/,
    required: true,
    minLength: [10, "Phone number must be 10 characters long"],
    maxLength: [10, "Phone number must be 10 characters long"],
    unique: true,
  },
  nic: {
    type: String,
    required: true,
    minLength: [12, "NIC must be 12 characters long"],
    maxLength: [12, "NIC must be 12 characters long"],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"], // Enum => Choices
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

// Hashing the password before saving it to the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare the password entered by the user with the hashed password in the database

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JsonWebToken (JWT) => Generate token

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("Message", userSchema);
