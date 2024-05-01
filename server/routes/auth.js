const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => {
      res.status(200).json({ message: "Signup Succesfully" });
    });
  } catch (error) {
    res.status(200).json({ message: "User Already Exist" });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Invalid password" });
    }

    // Remove password from user object before sending it back
    const { password: _, ...others } = user._doc;

    res.status(200).json({ user: others });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Internal server error" });
  }
});

module.exports = router;
