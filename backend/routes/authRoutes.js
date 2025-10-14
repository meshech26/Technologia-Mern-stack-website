import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // --- IMPORTANT ---
  // In a real app, you would find the user in the database
  // and compare the hashed password using bcrypt.
  // For this example, we compare directly against environment variables.
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    // User matched. Create a payload for the token.
    const payload = {
      user: {
        id: "admin_user", // Or a user ID from the database
        username: adminUsername,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" }, // Token expires in 8 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token to the client
      }
    );
  } else {
    // Credentials did not match
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
});

export default router;