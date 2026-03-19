const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "traffic_management"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Connection Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

module.exports = db;