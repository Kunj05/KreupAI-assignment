const pool = require('../config/db');

// Create a new behavioral record
exports.createBehavioralRecord = async (req, res) => {
  const { student_id, incident_date, incident_type, description, action_taken, staff_id, resolution_date, follow_up_required } = req.body;
  const created_by = req.body.created_by || "system"; 
  
  const query = `
    INSERT INTO behavioral_records 
    (student_id, incident_date, incident_type, description, action_taken, staff_id, resolution_date, follow_up_required, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(query, [student_id, incident_date, incident_type, description, action_taken, staff_id, resolution_date, follow_up_required, created_by]);
    res.status(201).json({ message: 'Behavioral record created successfully', recordId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all behavioral records
exports.getAllBehavioralRecords = async (req, res) => {
  try {
    const [records] = await pool.execute('SELECT * FROM behavioral_records');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific behavioral record by ID
exports.getBehavioralRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const [record] = await pool.execute('SELECT * FROM behavioral_records WHERE behavior_id = ?', [id]);
    if (record.length === 0) {
      return res.status(404).json({ message: 'Behavioral record not found' });
    }
    res.status(200).json(record[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a behavioral record by ID
exports.updateBehavioralRecord = async (req, res) => {
  const { id } = req.params;
  const { incident_type, description, action_taken, staff_id, resolution_date, follow_up_required, updated_by } = req.body;

  const query = `
    UPDATE behavioral_records 
    SET incident_type = ?, description = ?, action_taken = ?, staff_id = ?, resolution_date = ?, follow_up_required = ?, updated_by = ?, updated_date = CURRENT_TIMESTAMP 
    WHERE behavior_id = ?
  `;

  try {
    const [result] = await pool.execute(query, [incident_type, description, action_taken, staff_id, resolution_date, follow_up_required, updated_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Behavioral record not found' });
    }
    res.status(200).json({ message: 'Behavioral record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a behavioral record by ID
exports.deleteBehavioralRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM behavioral_records WHERE behavior_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Behavioral record not found' });
    }
    res.status(200).json({ message: 'Behavioral record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};