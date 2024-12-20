const pool = require('../config/db');

// Create a new term detail
exports.createTermDetail = async (req, res) => {
  const { term_name, academic_year, start_date, end_date } = req.body;
  const created_by = req.body.created_by || "system"; // Default created_by to "system"
  
  const query = `
    INSERT INTO term_details 
    (term_name, academic_year, start_date, end_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(query, [term_name, academic_year, start_date, end_date, created_by]);
    res.status(201).json({ message: 'Term details created successfully', termId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all term details
exports.getAllTermDetails = async (req, res) => {
  try {
    const [terms] = await pool.execute('SELECT * FROM term_details');
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific term detail by ID
exports.getTermDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const [term] = await pool.execute('SELECT * FROM term_details WHERE term_id = ?', [id]);
    if (term.length === 0) {
      return res.status(404).json({ message: 'Term detail not found' });
    }
    res.status(200).json(term[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update term details by ID
exports.updateTermDetail = async (req, res) => {
  const { id } = req.params;
  const { term_name, academic_year, start_date, end_date, updated_by } = req.body;

  const query = `
    UPDATE term_details 
    SET term_name = ?, academic_year = ?, start_date = ?, end_date = ?, updated_by = ?, updated_date = CURRENT_TIMESTAMP 
    WHERE term_id = ?
  `;

  try {
    const [result] = await pool.execute(query, [term_name, academic_year, start_date, end_date, updated_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Term detail not found' });
    }
    res.status(200).json({ message: 'Term details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a term detail by ID
exports.deleteTermDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM term_details WHERE term_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Term detail not found' });
    }
    res.status(200).json({ message: 'Term details deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
