const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is Required!"],
    minLength: [4, "First name must be 4 character"]
  },
  lastname: {
    type: String,
    required: [true, "Last Name is Required!"],
    minLength: [4, "Last name must be 4 character"]
  },
  contact: {
    type: String,
    required: [true, "Contact is Required!"],
    maxLength: [10, "Contact must not exceed 10 character"],
    minLength: [10, "Contact must be 10 character"]
  },
  city: {
    type: String,
    required: [true, "City Name is Required!"],
    minLength: [3, "City should be at least 3 characters long"]
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      "Email address is invalid"
    ]
  },
  password: {
    type: String,
    select: false,
    maxLength: [15, "Password should not exceed more than 15 character "],
    minLength: [6, "Password should have at least 6 character"],
  },
  resetPasswordToken: {
    type: String,
    default: "0"
  },
  avatar: {
    type: Object,
    default: {
      fileId: '',
      url: "https://images.unsplash.com/photo-1695504237592-df3322573ee4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
    }
  },
  resume: {
    education: [],
    jobs: [],
    internship: [],
    responsibilities: [],
    courses: [],
    project: [],
    skills: [],
    accomplishments: [],
  },
  internships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "internship"
    }
  ],
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job"
    }
  ]
}, {timestamps: true});

// Hash password before save
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password compare
studentSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
// Generate JWT token
studentSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h'
  });
};
const Student = mongoose.model("student", studentModel);
module.exports = Student;
