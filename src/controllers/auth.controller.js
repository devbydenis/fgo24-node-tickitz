const { constants: http } = require('http2');
const { user } = require('../models')

exports.register = async function (req, res){
  const {email, password, confirmPassword} = req.body
  const users = await user.findAll({
    where: {email: email},  // where clause
    attributes: ['id', 'email', 'password', 'role'] // milih data mana aja yang diambil
  });
  console.log('all users', JSON.stringify(users[0], null, 2)); // mengubah object menjadi string lalu ngasih indentasi sebesar 2 biar gampang dibaca

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
    password: password,
    role: 'user'
  });

  return res
    .status(http.HTTP_STATUS_OK)
    .json({
      success: true, 
      message: "Successfully registered"
    });
};