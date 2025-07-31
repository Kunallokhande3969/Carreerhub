require("dotenv").config();

const express = require("express");
const app = express();

// ===== Logger (Morgan) =====
const logger = require("morgan");
app.use(logger("dev"));

// ===== Database Connection =====
require("./models/database").connectDatabase();

// ===== CORS Configuration =====
const cors = require("cors");
const allowedOrigins = [
  "https://carreerhub-skix.vercel.app",
];

// Enhanced CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Explicit OPTIONS handler
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// ===== Body Parsers =====
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ===== Session and Cookies =====
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRETE || "defaultsecret",
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// ===== Routes =====
app.use("/", require("./routes/indexRouter"));
app.use("/resume", require("./routes/resumeRoutes")); 
app.use("/employe", require("./routes/employeRouter"));


// ===== Error Handling =====
const ErrorHandler = require("./utiles/ErorrHandler");
const { generatedErorrs } = require("./middlewares/erorrs");

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});

app.use(generatedErorrs);

// ===== Start Server =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed Origins: ${allowedOrigins.join(", ")}`);
});