const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); 
const rateLimit = require('express-rate-limit');

const behavioralRecordsRoutes = require('./routes/behavioralRecordsRoutes');
const extracurricularActivitiesRoutes = require('./routes/extracurricularActivitiesRoutes');
const studentAwardsRoutes = require('./routes/studentAwardsRoutes');
const classSectionRoutes = require('./routes/classSectionRoutes');
const termDetailsRoutes = require('./routes/termDetailsRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50,// 50 req in 15min
  message: 'Too many requests, please try again later.'
});

app.use('/api/v1/behavioral-records', behavioralRecordsRoutes);
app.use('/api/v1/extracurricular-activities', extracurricularActivitiesRoutes);
app.use('/api/v1/student-awards', studentAwardsRoutes);
app.use('/api/v1/class-sections', classSectionRoutes);
app.use('/api/v1/term-details', termDetailsRoutes);

app.get('/', (req, res) => {
  res.send('App started running');
});

pool.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to the database:', error.message);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
