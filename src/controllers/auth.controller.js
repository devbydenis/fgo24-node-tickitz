const {constants: http} = require("http2");
const bcrypt = require("bcrypt");
const {user, session} = require("../models");
const {generateToken, getDeviceInfo, generateOTP, sendResetEmail} = require("../utils/auth");
const { setAsync, getAsync, delAsync } = require("../db/redis");


exports.register = async function (req, res) {
  try {
    const {email, password, confirmPassword} = req.body;
    const users = await user.findAll({
      where: {email: email}, // where clause
      attributes: ["id", "email", "password", "role"], // milih data mana aja yang diambil
    });
    // console.log('all users', JSON.stringify(users[0], null, 2)); // mengubah object menjadi string lalu ngasih indentasi sebesar 2 biar gampang dibaca
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !password || !confirmPassword) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email, password, or confirm password are required",
      });
    }

    if (users.length > 0) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Password and confirm password must be same",
      });
    }

    await user.create({
      email: email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async function (req, res) {
  try {
    const {email, password} = req.body;
    const users = await user.findAll({
      where: {email: email},
      attributes: ["id", "email", "password", "role"],
    });
    const isPasswordValid = await bcrypt.compare(password, users[0].password);

    if (!email || !password) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (users.length === 0) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email not registered",
      });
    }

    if (!isPasswordValid) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email or password is wrong",
      });
    }

    const token = generateToken(users[0]);

    await session.create({
      user_id: users[0].id,
      token: token,
      device_info: getDeviceInfo(),
      is_active: true,
    });

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Login success",
    });
  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async function (req, res) {
  try {
    const {email} = req.body;
    const user = await user.findOne({
      where: {email: email},
    });

    if (!email) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email is required",
      });
    }

    if (user === null) {
      return res.status(http.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const emailAttempts = await incrAsync(`reset:attempts:${email}`);
    if (emailAttempts > 3) {
      await expireAsync(`reset:attempts:${email}`, 3600);
      return res.status(429).json({ 
        message: 'Too many requests for this email' 
      });
    }
    
    // set and save otp to redis for an hour
    const otp = generateOTP();
    await setAsync(
      `reset:otp:${email}`,
      3600,
      JSON.stringify({
        email: email,
        userId: user.id,
        used: false,
      })
    );

    // send otp via email
    await sendResetEmail(email, otp);

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "OTP has been sent to email.",
    });

  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async function (req, res) {
  try {
    const {email, otp, newPassword, newConfirmPassword} = req.body;
    const users = await user.findOne({
      where: {email: email},
    });
    console.log(users);

    const otpData = await getAsync(`reset:otp:${email}`);
    if (!otpData) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (!newPassword || !newConfirmPassword) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "New password and confirm password are required",
      });
    }

    if (newPassword !== newConfirmPassword) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "New password and confirm password must be same",
      });
    }

    // update password berdasarkan email
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update(
      {
        password: hashedPassword,
      },
      {
        where: {email: email},
      }
    );

    // tandain otp udah digunakan
    await setAsync(
      `reset:otp:${email}`,
      3600,
      JSON.stringify({
        ...JSON.parse(otpData),
        used: true,
      })
    )

    // hapus rate limit counter
    await delAsync(`reset:attempts:${email}`);

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Password has been reset",
    });

  } catch (error) {
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
