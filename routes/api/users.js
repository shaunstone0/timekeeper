const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @router  POST api/users
// @desc    Register Users
// @access  Public
router.post(
  '/',
  [
    //   Express Validation
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    //   Check if Errors are Present
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destruct req.body
    const { name, email, password } = req.body;

    try {
      // See if User Exists
      let user = await User.findOne({ email });
      // Send back Error if Existing User
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User Already Exists' }] });
      }

      // Get users avatar - if connected to email
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // Establish new User NOT SAVE
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password

      // create Salt
      const salt = await bcrypt.genSalt(10);
      // Hash Password
      user.password = await bcrypt.hash(password, salt);

      // Save User
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //   If any errors, throw error
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
