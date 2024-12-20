const db = require('../config/db');

// Create student_awards table
const createStudentAwardsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS student_awards (
      award_id SERIAL PRIMARY KEY,
      student_id INT NOT NULL REFERENCES student_profile(student_id) ON DELETE CASCADE,
      award_name VARCHAR(255) NOT NULL,
      award_description TEXT,
      date_awarded DATE NOT NULL,
      awarding_body VARCHAR(255),
      award_category VARCHAR(20) CHECK (award_category IN ('Academic', 'Extracurricular', 'Leadership', 'Community Service')),
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("student_awards table created successfully.");
  } catch (err) {
    console.error("Error while creating student_awards table:", err);
  }
};

module.exports = {
  createStudentAwardsTable
};
