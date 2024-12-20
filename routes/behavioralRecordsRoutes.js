const express = require('express');
const router = express.Router();
const behavioralRecordsController = require('../controllers/behavioralRecordsController');
const roleBasedAccess = require('../middleware/roleBasedAccess');

router.post('/create', 
  roleBasedAccess(['admin', 'teacher']), 
  behavioralRecordsController.createBehavioralRecord
);

router.get('/', 
  behavioralRecordsController.getAllBehavioralRecords
);

router.get('/:id', 
  behavioralRecordsController.getBehavioralRecordById
);

router.put('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  behavioralRecordsController.updateBehavioralRecord
);

router.delete('/:id', 
    roleBasedAccess(['admin', 'teacher']), 
  behavioralRecordsController.deleteBehavioralRecord
);

module.exports = router;
