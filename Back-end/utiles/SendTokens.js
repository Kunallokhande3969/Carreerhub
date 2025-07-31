const sendtoken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  
  // कुकी ऑप्शन्स
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user
  });
};