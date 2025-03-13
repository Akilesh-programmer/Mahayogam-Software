const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const batchRoutes = require('./routes/batchRoutes');
const studentRoutes = require('./routes/studentRoutes');
const BatchAttendanceDatesRoutes = require('./routes/BatchAttendanceDatesRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dates', BatchAttendanceDatesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
