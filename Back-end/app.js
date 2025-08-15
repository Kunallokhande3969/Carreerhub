require("dotenv").config();

const express = require("express");
const app = express();

// ===== Logger (Morgan) =====
const logger = require("morgan");
app.use(logger("tiny"));

// ===== Database Connection =====
require("./models/database").connectDatabase();

// ===== CORS =====
const cors = require("cors");
// ===== CORS =====

// Allow listing of frontend origins via env var (comma-separated)
const allowedOrigins = (process.env.FRONTEND_URLS || "http://localhost:3000,https://carreerhub-skix.vercel.app").split(",").map(s => s.trim());

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like server-to-server or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy: This origin is not allowed - " + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Set-Cookie']
}));

// ===== Body Parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ===== Session and Cookies =====
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "defaultsecret",
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
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

// Catch-all route
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});

// Error Middleware
app.use(generatedErorrs);

// ===== Start Server =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));