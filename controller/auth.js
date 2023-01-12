const User = require("../model/user");
const AppError = require("./../utils/AppError");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const cookieOptions = {
  maxAge: 60 * 100 * 1000,
  httpOnly: true,
};

const saveTokenCookie = (res, token) => {
  res.cookie("jwt", token, cookieOptions);
};

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    const token = createToken(user._id);
    saveTokenCookie(res, token);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = { ...req.body };
  const user = await User.findOne({ email: email });

  if (!user) {
    return next(
      new AppError("Bunday user mavjus emas iltimos royxatdan oting")
    );
  }
  if (user.password != password) {
    return next(new AppError("Parolni togri kiriting"));
  }
  const token = createToken(user._id);
  saveTokenCookie(res, token);

  // 5) Response qaytarish
  res.status(200).json({
    status: "success",
    token: token,
    user,
  });
};

module.exports = { register, login };
