const pool = require('../config/db');

// Create a new extracurricular activity record
exports.createExtracurricularActivity = async (req, res) => {
  const { student_id, activity_name, activity_type, participation_date, level_of_participation, award_received, teacher_in_charge, comments } = req.body;
  const created_by = req.body.created_by || "system"; 
  
  const query = `
    INSERT INTO extracurricular_activities 
    (student_id, activity_name, activity_type, participation_date, level_of_participation, award_received, teacher_in_charge, comments, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(query, [student_id, activity_name, activity_type, participation_date, level_of_participation, award_received, teacher_in_charge, comments, created_by]);
    res.status(201).json({ message: 'Extracurricular activity created successfully', activityId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all extracurricular activity records
exports.getAllExtracurricularActivities = async (req, res) => {
  try {
    const [activities] = await pool.execute('SELECT * FROM extracurricular_activities');
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an extracurricular activity by ID
exports.getExtracurricularActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const [activity] = await pool.execute('SELECT * FROM extracurricular_activities WHERE activity_id = ?', [id]);
    if (activity.length === 0) {
      return res.status(404).json({ message: 'Activity record not found' });
    }
    res.status(200).json(activity[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an extracurricular activity record
exports.updateExtracurricularActivity = async (req, res) => {
  const { id } = req.params;
  const { activity_name, activity_type, participation_date, level_of_participation, award_received, teacher_in_charge, comments, updated_by } = req.body;

  const query = `
    UPDATE extracurricular_activities 
    SET activity_name = ?, activity_type = ?, participation_date = ?, level_of_participation = ?, award_received = ?, teacher_in_charge = ?, comments = ?, updated_by = ?, updated_date = CURRENT_TIMESTAMP 
    WHERE activity_id = ?
  `;

  try {
    const [result] = await pool.execute(query, [activity_name, activity_type, participation_date, level_of_participation, award_received, teacher_in_charge, comments, updated_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Extracurricular activity not found' });
    }
    res.status(200).json({ message: 'Extracurricular activity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an extracurricular activity record
exports.deleteExtracurricularActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM extracurricular_activities WHERE activity_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Extracurricular activity not found' });
    }
    res.status(200).json({ message: 'Extracurricular activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
