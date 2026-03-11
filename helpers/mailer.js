const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Music Course" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
    return info; // PENTING: Kembalikan info sukses
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    throw error; // PENTING: Lempar error agar ditangkap rute (Postman jadi 500, bukan 200)
  }
};

module.exports = { sendEmail };