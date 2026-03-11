const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateToken } = require('../helpers/token');

// Tambahkan import sendEmail dari helper mailer
const { sendEmail } = require('../helpers/mailer');

const authController = require('../controllers/auth');
const studentController = require('../controllers/student');
const teacherController = require('../controllers/teacher');
const dashboardController = require('../controllers/dashboard');
const { authentication } = require('../middlewares/auth');

// ==========================================
// 1. Public Routes (No Login Required)
// ==========================================

// --- EMAIL TEST ROUTE ---
router.get('/test-email', async (req, res) => {
  try {
    const { targetEmail } = req.query;

    if (!targetEmail) {
      return res.status(400).json({ 
        message: "Bad Request", 
        detail: "Please provide ?targetEmail=... in the URL query" 
      });
    }

    await sendEmail(
      targetEmail,
      'Music Course - Admin Registration Successful',
      `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Welcome to the Team!</h2>
        <p>Hello, your account has been successfully registered as an <b>Admin</b> at <strong>Music Course</strong>.</p>
        <p>You now have access to manage students and teachers schedules through the admin dashboard.</p>
        <hr />
        <p style="font-size: 0.8em; color: #555;">This is an automated message to confirm your administrative setup.</p>
      </div>
      `
    );

    res.status(200).json({ 
      message: "Success", 
      detail: `Administrative welcome email has been sent to ${targetEmail}` 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
});

// Manual Auth Routes (Login/Register)
router.use('/', authController); 

// --- GOOGLE OAUTH ROUTES ---
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

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

router.get('/auth/error', (req, res) => {
  res.status(401).json({
    message: "Google Login Failed",
    detail: "A technical error occurred while authenticating or registering your account."
  });
});

// ==========================================
// 2. Middleware Authentication (The Door Lock)
// ==========================================
// Pastikan rute test-email ada DI ATAS baris ini
router.use(authentication);

// ==========================================
// 3. Protected Routes (Login Required)
// ==========================================
router.use('/students', studentController);
router.use('/teachers', teacherController);
router.use('/dashboard', dashboardController);

module.exports = router;