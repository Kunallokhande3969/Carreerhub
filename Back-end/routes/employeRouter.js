const express = require("express");
const router = express.Router();
const upload = require("../utiles/Multer");

const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentEmploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
  deleteemploye,
  closejob,
} = require("../controllers/employeController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

// GET /
router.get("/", homepage);

// POST / employe
router.post("/current", isAuthenticated, authorizeRoles("employe"), currentEmploye);

// POST / Delete
router.get("/delete", isAuthenticated, authorizeRoles("employe"), deleteemploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /avatar/:id  <-- YAHI SIRF RAKHO!
router.post(
  "/avatar/:id",
  isAuthenticated,
  authorizeRoles("employe"),
  upload.single("organizationLogo"),
  employeavatar
);

// POST /employe/signin
router.post("/signin", employesignin);

// GET /employe/signout
router.get("/signout", isAuthenticated, authorizeRoles("employe"), employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// POST /employe/forget-link
router.post("/forget-link", employeforgetlink);

// POST /employe/reset-password/:id
router.post("/reset-password/:id", isAuthenticated, authorizeRoles("employe"), employeresetpassword);

// POST /employe/update/:id
router.post("/update/:id", isAuthenticated, authorizeRoles("employe"), employeupdate);

// ===================INTERNSHIP====================

// POST /employe/internship/create
router.post("/internship/create", isAuthenticated, authorizeRoles("employe"), createinternship);

// POST /employe/internship/read
router.post("/internship/read", isAuthenticated, authorizeRoles("employe"), readinternship);

// POST /employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, authorizeRoles("employe"), readsingleinternship);

// ===================JOBS====================

// POST /employe/job/create
router.post("/job/create", isAuthenticated, authorizeRoles("employe"), createjob);

// POST /employe/job/read
router.post("/job/read", isAuthenticated, authorizeRoles("employe"), readjob);

// POST /employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, authorizeRoles("employe"), readsinglejob);

// POST /employe/job/close/:id
router.post("/job/close/:id", isAuthenticated, authorizeRoles("employe"), closejob);

module.exports = router;