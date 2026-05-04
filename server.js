require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const signalRoutes = require('./routes/signalRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // Serve static files from 'public' folder

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/signals', signalRoutes);

// Serve frontend for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to database and start server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Frontend: http://localhost:${PORT}`);
  });
};

startServer();
