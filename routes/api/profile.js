const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router  GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['user', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user'
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router  POST api/profile/
// @desc    Create or Update Users Profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('gender', 'please select a gender')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      gender,
      nationality,
      phone,
      street,
      city,
      state,
      zip,
      license,
      car
    } = req.body;

    // Build Object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (gender) profileFields.gender = gender;
    if (nationality) profileFields.nationality = nationality;
    if (phone) profileFields.phone = phone;

    profileFields.address = {};
    if (street) profileFields.address.street = street;
    if (city) profileFields.address.city = city;
    if (state) profileFields.address.state = state;
    if (zip) profileFields.address.zip = zip;

    profileFields.driver = {};
    if (license) profileFields.driver.license = license;
    if (car) profileFields.driver.car = car;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //   Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      //   Create Profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router  GET api/profile/
// @desc    Get All Profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
// @router  GET api/profile/user/:user_id
// @desc    Get Profile UserID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/profile/
// @desc    Delete Profile, User
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    //   Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User has been Deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
