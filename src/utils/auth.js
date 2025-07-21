const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');


function generateToken(user){
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const options = {
    expiresIn: '1d' // berlaku satu hari aja
  }

  return jwt.sign(payload, process.env.SECRET_KEY, options)
}

function verifyToken(token){
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    console.log('verify token problem: ', error)
    return null
  }
}

function getDeviceInfo() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|tablet|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent);
  const isTablet = /tablet|ipad|playbook|silk/i.test(userAgent) && !/mobile/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  let deviceInfo = ''
  if (isMobile) {
    deviceInfo = 'Mobile'
  }
  if (isTablet) {
    deviceInfo = 'Tablet'
  }
  if (isDesktop) {
    deviceInfo = 'Desktop'
  }

  return deviceInfo;
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send reset email
const sendResetEmail = async (email, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below to proceed:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateToken,
  verifyToken,
  getDeviceInfo,
  generateOTP,
  sendResetEmail
}

