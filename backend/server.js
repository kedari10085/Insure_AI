const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/policies', require('./routes/policies'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/chat', require('./routes/chat'));

// Basic route
app.get('/', (req, res) => {
  res.send('Insure AI API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
