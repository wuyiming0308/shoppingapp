const mongoose = require("mongoose");
require("../model/user");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const ErrorCode = {
  INVALID_EMAIL: "invalid email",
  INVALID_PASSWORD: "invalid password",
  SIGNUP_FAILURE: "signup failure",
  SIGNIN_FAILURE: "password or email incorrect",
};

function generateToken(user) {
  return jwt.sign(user, "a3C($M@f<2p0", {
    expiresIn: 10080, //in seconds
  });
}

/**
 * Function handling login request
 */
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(200)
      .json({ success: false, error: ErrorCode.INVALID_EMAIL });
  }
  if (!password) {
    return res
      .status(200)
      .json({ success: false, error: ErrorCode.INVALID_PASSWORD });
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res
        .status(200)
        .json({ success: false, error: ErrorCode.SIGNIN_FAILURE });
    }
    if (!user) {
      return res.status(200).json({
        success: false,
        error: ErrorCode.SIGNIN_FAILURE,
      });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ success: false, error: ErrorCode.SIGNIN_FAILURE });
      }
      if (!isMatch) {
        return res.status(200).json({
          success: false,
          error: ErrorCode.SIGNIN_FAILURE,
        });
      }
      let userInfo = user.toJson();
      res.status(200).json({
        success: true,
        token: "Bearer " + generateToken(userInfo),
        user: userInfo,
      });
    });
  });
};

/**
 * Function handling signup request
 */
exports.signup = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(200)
      .json({ success: false, error: ErrorCode.INVALID_EMAIL });
  }
  if (!password) {
    return res
      .status(200)
      .json({ success: false, error: ErrorCode.INVALID_PASSWORD });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(200).send({
        success: false,
        error: "That email address is already in use.",
      });
    } else {
      let user = new User({
        email: email,
        password: password,
      });
      user.save(function (err, user) {
        if (err) {
          return next(err);
        }
        let userInfo = user.toJson();
        res.status(200).json({
          success: true,
          token: "JWT " + generateToken(userInfo),
          user: userInfo,
        });
      });
    }
  });
};
