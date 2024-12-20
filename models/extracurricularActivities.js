const db = require('../config/db');

// Create extracurricular_activities table
const createExtracurricularActivitiesTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS extracurricular_activities (
      activity_id SERIAL PRIMARY KEY,
      student_id INT NOT NULL REFERENCES student_profile(student_id) ON DELETE CASCADE,
      activity_name VARCHAR(255) NOT NULL,
      activity_type VARCHAR(15) CHECK (activity_type IN ('Sports', 'Arts', 'Clubs', 'Competitions')),
      participation_date DATE NOT NULL,
      level_of_participation VARCHAR(15) CHECK (level_of_participation IN ('School', 'District', 'State', 'National')),
      award_received VARCHAR(255),
      teacher_in_charge INT REFERENCES staff_profile(staff_id) ON DELETE SET NULL,
      comments TEXT,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("extracurricular_activities table created successfully.");
  } catch (err) {
    console.error("Error while creating extracurricular_activities table:", err);
  }
};

module.exports = {
  createExtracurricularActivitiesTable
};
