import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  phone: {
    type: String /*Number is not taken because minLength and maxLength validations only comes with String type*/,
    required: true,
    minLength: [10, "Phone number must be 10 characters long"],
    maxLength: [10, "Phone number must be 10 characters long"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must be at least 10 characters long"],
  },
});

export const Message = mongoose.model(
  "Message",
  messageSchema
); /*Message is the name of the model/collection which is based on the messageSchema.*/
