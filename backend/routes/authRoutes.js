const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../config/db");

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

// Keep auth self-contained for student project setup by auto-creating users table.
db.query(
  `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(80) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(120) DEFAULT NULL,
      role VARCHAR(40) DEFAULT 'member',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id),
      UNIQUE KEY username (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `,
  (err) => {
    if (err) {
      console.error("Failed to ensure users table:", err.message);
    }
  },
);

router.post("/register", (req, res) => {
  const { username, password, full_name } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  const sql =
    "INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [username.trim(), hashPassword(password), full_name || null, "member"],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Unable to register user" });
      }

      return res
        .status(201)
        .json({ message: "Registration successful. Please login." });
    },
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  const validUsername = process.env.APP_USERNAME || "admin";
  const validPassword = process.env.APP_PASSWORD || "admin123";

  const sql =
    "SELECT user_id, username, full_name, role, password_hash FROM users WHERE username = ? LIMIT 1";
  db.query(sql, [username.trim()], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Unable to login" });
    }

    if (rows.length > 0) {
      const user = rows[0];
      if (user.password_hash !== hashPassword(password)) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      return res.json({
        message: "Login successful",
        user: {
          user_id: user.user_id,
          username: user.username,
          full_name: user.full_name,
          role: user.role,
        },
      });
    }

    // Backward-compatible admin fallback for first run.
    if (username === validUsername && password === validPassword) {
      return res.json({
        message: "Login successful",
        user: {
          username,
          role: "traffic-admin",
        },
      });
    }

    return res.status(401).json({ message: "Invalid username or password" });
  });
});

module.exports = router;
