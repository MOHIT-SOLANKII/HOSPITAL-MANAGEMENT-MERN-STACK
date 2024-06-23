import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
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
    appointment_date: {
        type: String,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    doctor: {
        firstName: {},
        lastName:{}
    },
    hasVisited: {
        type: Boolean,
        required:true
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default:"Pending"
    }
});


export const Appointment = mongoose.model("Appointment", appointmentSchema);
