const jwt = require('jsonwebtoken')

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

console.log(getDeviceInfo())

module.exports = {
  generateToken,
  verifyToken,
  getDeviceInfo
}

