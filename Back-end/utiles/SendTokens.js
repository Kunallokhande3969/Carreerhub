exports.sendtoken = (employe, statusCode, res) => {
  const token = employe.getjwttoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Production me secure true rakhein
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site cookie ke liye "none" (https chahiye)
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: employe._id, token });
};
