const { constants: http } = require('http2');
const { user, session } = require('../models');
const { generateToken, getDeviceInfo } = require('../utils/auth');
const bcrypt = require('bcrypt');

exports.register = async function (req, res){
  try {
    const {email, password, confirmPassword} = req.body
    const users = await user.findAll({
      where: {email: email},  // where clause
      attributes: ['id', 'email', 'password', 'role'] // milih data mana aja yang diambil
    });
    // console.log('all users', JSON.stringify(users[0], null, 2)); // mengubah object menjadi string lalu ngasih indentasi sebesar 2 biar gampang dibaca
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !password || !confirmPassword) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Email, password, or confirm password are required"
        });
    }

    if (users.length > 0) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Email already exists"
        });
    }

    if (password !== confirmPassword) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Password and confirm password must be same"
        });
    }

    await user.create({
      email: email,
      password: hashedPassword,
      role: 'user'
    });

    return res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true, 
        message: "Successfully registered"
      });

  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false, 
      message: error.message
    });
  }
  
};

exports.login = async function (req, res) {
  try {
    const {email, password} = req.body
    const users = await user.findAll({
      where: {email: email}, 
      attributes: ['id', 'email', 'password', 'role']
    })
    const isPasswordValid = await bcrypt.compare(password, users[0].password);

    if (!email || !password) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Email and password are required"
        });
    }

    if (users.length === 0) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Email not registered"
        });
    }

    if (!isPasswordValid) {
      return res
        .status(http.HTTP_STATUS_BAD_REQUEST)
        .json({
          success: false, 
          message: "Email or password is wrong"
        });
    } 

    const token = generateToken(users[0]);
    
    await session.create({
      user_id: users[0].id,
      token: token,
      device_info: getDeviceInfo(),
      is_active: true
    });
    
    return res
      .status(http.HTTP_STATUS_OK)
      .json({
        success: true, 
        message: "Login success"
      });

  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};