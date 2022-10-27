const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// Middlewares
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");

const { SERVER_ERROR, VALID_EMAIL, PASSWORD_REQUIRED } = config.get("strings");

/**
 * @route   GET api/auth
 * @desc    Test route
 * @access  Public
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR);
  }
});

/**
 * @route   POST api/auth
 * @desc    Authenticate User and Get Token
 * @access  Public
 */
router.post(
  "/",
  [
    check("email", VALID_EMAIL).isEmail(),
    check("password", PASSWORD_REQUIRED).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        config.get("jwtOptions"),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(SERVER_ERROR);
    }
  }
);

module.exports = router;
