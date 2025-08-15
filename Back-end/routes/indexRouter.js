const express = require("express");
const router = express.Router();
const { 
    homepage ,
    studentsignup,
    studentsignin,
    studentsignout,
    current,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
    deletestudent,
    studentreadalljobs,
    studentreadallinternships,
    readsinglejob,
    readsingleinternship,
} = require("../controllers/indexController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");


// GET / 
router.get("/",homepage)

// POST / student
router.post("/student",isAuthenticated, authorizeRoles("student"),current)

// POST / student
router.get("/student/delete",isAuthenticated, authorizeRoles("student"),deletestudent)

// POST /student/signup
router.post("/student/signup",studentsignup)

// POST /student/signin
router.post("/student/signin", studentsignin)

// GET /student/signout
router.get("/student/signout",isAuthenticated, authorizeRoles("student"), studentsignout)

// POST /student/send-mail
router.post("/student/send-mail",studentsendmail)


// POST /student/forget-link/:studentid
router.post("/student/forget-link",studentforgetlink)

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated, authorizeRoles("student"), studentresetpassword)

// POST /student/update/:studentid
router.post("/student/update/:id",isAuthenticated, authorizeRoles("student"), studentupdate)

// POST /student/readalljob
router.post("/student/alljob",isAuthenticated, authorizeRoles("student"), studentreadalljobs)

// POST /student/readallinternship
router.post("/student/allinternship",isAuthenticated, authorizeRoles("student"), studentreadallinternships)

// POST /student/update/:studentId
router.post("/student/avatar/:id" , isAuthenticated, authorizeRoles("student"), studentavatar )

//=================Apply Internships===================

router.post("/student/apply/internship/:internshipid" , isAuthenticated, authorizeRoles("student"),applyinternship)

//================Apply Jobs===========================

router.post("/student/apply/job/:jobid" , isAuthenticated, authorizeRoles("student"),applyjob)

// ====================close job =====================================

router.post("/job/read/:id" , isAuthenticated , readsinglejob )

router.post("/internship/read/:id" , isAuthenticated , readsingleinternship )
module.exports = router;