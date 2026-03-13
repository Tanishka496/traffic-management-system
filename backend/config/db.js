const mysql = require('mysql2');

// Create a connection pool
const db = mysql.createPool({
  host: 'localhost',           // MySQL server host
  user: 'YOUR_USERNAME',       // replace with your MySQL username (e.g., root)
  password: 'YOUR_PASSWORD',   // replace with your MySQL password
  database: 'traffic_management', // database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database successfully!');
    connection.release(); // release connection back to pool
  }
});

module.exports = db;