const db = require('../config/db');

// Create class_section table
const createClassSectionTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS class_section (
      class_id SERIAL PRIMARY KEY,
      class_name VARCHAR(255) NOT NULL,
      section VARCHAR(50),
      teacher_id INT REFERENCES teacher_profile(teacher_id) ON DELETE SET NULL,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("class_section table created successfully.");
  } catch (err) {
    console.error("Error while creating class_section table:", err);
  }
};

module.exports = {
  createClassSectionTable
};
