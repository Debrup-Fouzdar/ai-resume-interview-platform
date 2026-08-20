const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

/* require all the routes here */
const authRoutes = require('./routes/auth.routes');
const interviewRoutes = require('./routes/interview.routes');

/* using all the routes here */
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

module.exports = app;