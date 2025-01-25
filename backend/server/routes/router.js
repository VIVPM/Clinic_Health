
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/model');

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
    });

    const result = await user.save();
    const { password, ...data } = result.toJSON();

    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if password exists in the user document
    if (!user.password) {
      console.error("Hashed password is missing for the user:", user);
      return res.status(500).send({ message: 'Invalid user data' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, 'secret');
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.send({ message: 'Login successful' });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');

    if (!claims) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = user.toJSON();

    res.send(data);
  } catch (e) {
    res.status(401).send({ message: 'Unauthenticated' });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({ message: 'success' });
});

module.exports = router;
