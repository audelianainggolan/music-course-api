const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateToken } = require('../helpers/token');

const authController = require('../controllers/auth');
const studentController = require('../controllers/student');
const teacherController = require('../controllers/teacher');
const dashboardController = require('../controllers/dashboard');
const { authentication } = require('../middlewares/auth');

// ==========================================
// 1. Public Routes (Tanpa Login)
// ==========================================

// Rute Auth Manual (Login/Register biasa)
router.use('/', authController); 

// --- GOOGLE OAUTH ROUTES ---

// 1. Pilih Akun Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// 2. Callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/auth/error', 
    session: false 
  }),
  (req, res) => {
    const token = generateToken({ id: req.user._id, email: req.user.email });
    
    res.json({
      message: "Login successful",
      token: token
    });
  }
);

// 3. Rute Error (Sesuaikan pesannya karena sekarang sudah Auto-Register)
router.get('/auth/error', (req, res) => {
  res.status(401).json({
    message: "Google Login Failed",
    detail: "A technical error occurred while authenticating or registering your account. Please check the server terminal for more details"
  });
});


// ==========================================
// 2. Middleware Authentication (Kunci Pintu)
// ==========================================
router.use(authentication);

// ==========================================
// 3. Protected Routes (Wajib Login)
// ==========================================
router.use('/students', studentController);
router.use('/teachers', teacherController);
router.use('/dashboard', dashboardController);

module.exports = router;