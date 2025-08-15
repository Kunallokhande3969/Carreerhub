// In SendTokens.js
const sendtoken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7;
  const maxAge = cookieExpireDays * 24 * 60 * 60 * 1000;

  const options = {
    expires: new Date(Date.now() + maxAge),
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  };

  // Allow explicit domain override in production (e.g. '.yourdomain.com')
  if (process.env.COOKIE_DOMAIN) {
    options.domain = process.env.COOKIE_DOMAIN;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = { sendtoken };