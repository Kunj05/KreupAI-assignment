const pool = require('../config/db');

// Create a new class section
exports.createClassSection = async (req, res) => {
  const { class_name, section, teacher_id } = req.body;
  const created_by = req.body.created_by || "system"; 
  
  const query = `
    INSERT INTO class_section 
    (class_name, section, teacher_id, created_by)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(query, [class_name, section, teacher_id, created_by]);
    res.status(201).json({ message: 'Class section created successfully', classId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all class sections
exports.getAllClassSections = async (req, res) => {
  try {
    const [sections] = await pool.execute('SELECT * FROM class_section');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific class section by ID
exports.getClassSectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [section] = await pool.execute('SELECT * FROM class_section WHERE class_id = ?', [id]);
    if (section.length === 0) {
      return res.status(404).json({ message: 'Class section not found' });
    }
    res.status(200).json(section[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class section by ID
exports.updateClassSection = async (req, res) => {
  const { id } = req.params;
  const { class_name, section, teacher_id, updated_by } = req.body;

  const query = `
    UPDATE class_section 
    SET class_name = ?, section = ?, teacher_id = ?, updated_by = ?, updated_date = CURRENT_TIMESTAMP 
    WHERE class_id = ?
  `;

  try {
    const [result] = await pool.execute(query, [class_name, section, teacher_id, updated_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Class section not found' });
    }
    res.status(200).json({ message: 'Class section updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class section by ID
exports.deleteClassSection = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM class_section WHERE class_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Class section not found' });
    }
    res.status(200).json({ message: 'Class section deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
