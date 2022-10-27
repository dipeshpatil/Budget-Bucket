const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = require("../../models/User");

const {
  SERVER_ERROR,
  NAME_REQUIRED,
  VALID_EMAIL,
  VALID_PASSWORD,
  USER_EXISTS,
} = config.get("strings");

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post(
  "/",
  [
    check("name", NAME_REQUIRED).not().isEmpty(),
    check("email", VALID_EMAIL).isEmail(),
    check("password", VALID_PASSWORD).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if user already exists
      if (user) {
        return res.status(400).json({ errors: [{ msg: USER_EXISTS }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
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
