exports.isAuthenticated = catchAsyncErorrs(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErorrHandler("Please log in to access the resources", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if (!student) {
      return next(new ErorrHandler("User not found", 404));
    }
    req.user = student; 
    next();
  } catch (error) {
    return next(new ErorrHandler("Invalid or expired token. Please log in again.", 401));
  }
});