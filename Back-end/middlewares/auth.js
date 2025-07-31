const jwt = require("jsonwebtoken");
const ErorrHandler = require("../utiles/ErorrHandler");
const { catchAsyncErorrs } = require("./catchAsyncErorrs");

exports.isAuthenticated = catchAsyncErorrs(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErorrHandler("Please log in to access the resources", 401));
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id };
    req.id = id;
    return next();
  } catch (error) {
    return next(new ErorrHandler("Invalid or expired token. Please log in again.", 401));
  }
});
