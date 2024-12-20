// models/behavioralRecords.js
const db = require('../config/db');

// Create behavioral_records table
const createBehavioralRecordsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS behavioral_records (
      behavior_id SERIAL PRIMARY KEY,
      student_id INT NOT NULL REFERENCES student_profile(student_id) ON DELETE CASCADE,
      incident_date DATE NOT NULL,
      incident_type VARCHAR(10) CHECK (incident_type IN ('Positive', 'Negative')),
      description TEXT NOT NULL,
      action_taken TEXT,
      staff_id INT REFERENCES staff_profile(staff_id) ON DELETE SET NULL,
      resolution_date DATE,
      follow_up_required BOOLEAN DEFAULT FALSE,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("behavioral_records table created successfully.");
  } catch (err) {
    console.error("Error while creating behavioral_records table:", err);
  }
};

module.exports = {
  createBehavioralRecordsTable
};
