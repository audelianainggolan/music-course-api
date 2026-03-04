const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;

    // 1. Cari user berdasarkan email
    User.findOne({ email })
      .then((user) => {
        if (user) {
          // 2. Jika user ditemukan, langsung lanjut login
          return done(null, user);
        } else {
          // 3. Jika tidak ada, buat user baru (Auto-Register)
          return User.create({
            username: profile.displayName || profile.name.givenName,
            email: email,
            password: 'google-oauth-dummy-' + Math.random().toString(36).slice(-8),
            role: 'admin'
          });
        }
      })
      .then((newUser) => {
        // Cek jika ini adalah hasil dari User.create (user baru)
        if (newUser && !newUser._isExisting) {
           console.log(`User baru otomatis terdaftar: ${email}`);
           return done(null, newUser);
        }
      })
      .catch((err) => {
        console.error("Error pada proses Google OAuth:", err);
        return done(err, null);
      });
  }
));

module.exports = passport;