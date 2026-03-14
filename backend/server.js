const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const violationRoutes = require('./routes/violationRoutes');

// Use routes
app.use('/violations', violationRoutes);

app.get('/', (req, res) => {
  res.send('Traffic Management Backend Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});