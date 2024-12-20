const pool = require('../config/db');

// Create a new student award
exports.createStudentAward = async (req, res) => {
  const { student_id, award_name, award_description, date_awarded, awarding_body, award_category } = req.body;
  const created_by = req.body.created_by || "system"; 
  
  const query = `
    INSERT INTO student_awards 
    (student_id, award_name, award_description, date_awarded, awarding_body, award_category, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(query, [student_id, award_name, award_description, date_awarded, awarding_body, award_category, created_by]);
    res.status(201).json({ message: 'Award created successfully', awardId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all student awards
exports.getAllStudentAwards = async (req, res) => {
  try {
    const [awards] = await pool.execute('SELECT * FROM student_awards');
    res.status(200).json(awards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a student award by ID
exports.getStudentAwardById = async (req, res) => {
  const { id } = req.params;
  try {
    const [award] = await pool.execute('SELECT * FROM student_awards WHERE award_id = ?', [id]);
    if (award.length === 0) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.status(200).json(award[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student award
exports.updateStudentAward = async (req, res) => {
  const { id } = req.params;
  const { award_name, award_description, date_awarded, awarding_body, award_category, updated_by } = req.body;

  const query = `
    UPDATE student_awards 
    SET award_name = ?, award_description = ?, date_awarded = ?, awarding_body = ?, award_category = ?, updated_by = ?, updated_date = CURRENT_TIMESTAMP 
    WHERE award_id = ?
  `;

  try {
    const [result] = await pool.execute(query, [award_name, award_description, date_awarded, awarding_body, award_category, updated_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.status(200).json({ message: 'Award updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student award
exports.deleteStudentAward = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM student_awards WHERE award_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Award not found' });
    }
    res.status(200).json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
