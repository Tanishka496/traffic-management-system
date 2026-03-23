const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.APP_USERNAME || "admin";
  const validPassword = process.env.APP_PASSWORD || "admin123";

  if (username !== validUsername || password !== validPassword) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  return res.json({
    message: "Login successful",
    user: {
      username,
      role: "traffic-admin",
    },
  });
});

module.exports = router;
