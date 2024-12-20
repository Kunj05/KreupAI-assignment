const db = require('../config/db');

// Create term_details table
const createTermDetailsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS term_details (
      term_id SERIAL PRIMARY KEY,
      term_name VARCHAR(255) NOT NULL,
      academic_year VARCHAR(10) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_by VARCHAR(50),
      updated_by VARCHAR(50),
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("term_details table created successfully.");
  } catch (err) {
    console.error("Error while creating term_details table:", err);
  }
};

module.exports = {
  createTermDetailsTable
};
