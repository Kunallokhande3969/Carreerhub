const jwt = require("jsonwebtoken");
const ErorrHandler = require("../utiles/ErorrHandler");
const { catchAsyncErorrs } = require("./catchAsyncErorrs");

exports.isAuthenticated = catchAsyncErorrs(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErorrHandler("Please log in to access the resources", 404));
  }

  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id, role };
  req.id = id; // <-- Yeh line add karo!
  next();
});

// Authorization middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErorrHandler("You are not allowed to access this resource", 403));
    }
    next();
  };
};