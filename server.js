const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/upload', express.static(path.join(__dirname, '/upload')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./route/auth');
const attendanceRoutes = require('./route/attendanc');
const adminRoutes = require('./route/admin');

app.use('/api', authRoutes);
app.use('/api/attendanc', attendanceRoutes);
app.use('/api/admin', adminRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});