require("dotenv").config();
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/auth')

// @route GET api/auth
// @desc Check if the user log in or not
// @access Public
router.get('/', verifyToken, async(req,res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if(!user)
    return res.sendStatus(400).json({success: false, message: 'user not found'})

    res.json({success: true, user})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})



// @route POST api/auth/register
// @desc register user
// @access Public
// nc voi DB pahi dung async await
router.post('/register', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
// @route POST api/auth/login
// @desc login user
// @access Public
// nc voi DB pahi dung async await

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .sendStatus(400)
      .json({ success: false, message: "Mising username and/or password" });

  try {
    //contact with DB so should use try catch and await
    //Check for existing user
    //Find for two username that same name
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Username/Password" });

    //username found
    const passwordValid = await argon2.verify(user.password, password); //verify two these passwords

    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Username/Password" });

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      
    );

    res.json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
