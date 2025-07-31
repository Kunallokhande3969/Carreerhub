const sendtoken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  };


  const userData = {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  };

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: userData
    });
};

module.exports = { sendtoken };