const { catchAsyncErorrs } = require("../middlewares/catchAsyncErorrs");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utiles/ErorrHandler");
const { sendtoken } = require("../utiles/SendTokens");
const { sendmail } = require("../utiles/nodemailer");
const imagekit = require("../utiles/imageKit");
const path = require("path");

exports.studentsignup = catchAsyncErorrs(async (req, res, next) => {
  const student = await new Student(req.body).save();
  
  // मैन्युअली पासवर्ड हश करें
  const salt = bcrypt.genSaltSync(10);
  student.password = bcrypt.hashSync(req.body.password, salt);
  await student.save();

  sendtoken(student, 200, res);
});

// SignIn Function
exports.studentsignin = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student) {
    return next(new ErorrHandler("Invalid credentials", 401));
  }

  const isMatch = await student.comparepassword(req.body.password);
  if (!isMatch) {
    return next(new ErorrHandler("Invalid credentials", 401));
  }

  sendtoken(student, 200, res);
});

// SignOut Function
exports.studentsignout = catchAsyncErorrs(async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  };

  res.clearCookie("token", options);
  res.status(200).json({
    success: true,
    message: "Successfully signed out"
  });
});

exports.studentsendmail = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErorrHandler("User not found with this email address !", 404)
    );
  }

  const url = Math.floor(Math.random() * 9000 + 1000);
  sendmail(req, res, next, url);
  student.resetPasswordToken = `${url}`;
  await student.save();
  res.json({ student, url });
});

exports.studentforgetlink = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student) {
    return next(
      new ErorrHandler("User not found with this email address !", 404)
    );
  }
  if (student.resetPasswordToken == req.body.otp) {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErorrHandler("Invalid Password Link please try again!", 500)
    );
  }
  res.status(200).json({
    message: "Password has been successfully changed",
  });
});

exports.studentresetpassword = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});

exports.studentupdate = catchAsyncErorrs(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Student details have been updated",
  });
});

exports.studentavatar = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  const file = req.files.avatar;
  const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedName,
  });
  student.avatar = { fileId, url };
  await student.save();
  res.json({
    success: true,
    message: "Avatar successfully uploaded",
  });
});

//=================Apply Internships===================
exports.applyinternship = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json({ student, internship });
});

//================Apply Jobs===========================

exports.applyjob = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student, job });
});

// ================job read alll
exports.studentreadalljobs = catchAsyncErorrs(async (req, res, next) => {
  const job = await Job.find().exec();
  res.status(200).json({ job });
});

// =================internship all ===================
exports.studentreadallinternships = catchAsyncErorrs(async (req, res, next) => {
  const internship = await Internship.find().exec();
  res.json({ internship });
});

exports.readsinglejob = catchAsyncErorrs(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});

exports.readsingleinternship = catchAsyncErorrs(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});
