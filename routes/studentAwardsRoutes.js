const express = require('express');
const router = express.Router();
const studentAwardsController = require('../controllers/studentAwardsController');
const roleBasedAccess = require('../middleware/roleBasedAccess');

router.post('/create', 
  roleBasedAccess(['admin', 'teacher']), 
  studentAwardsController.createStudentAward
);

router.get('/', 
  studentAwardsController.getAllStudentAwards
);

router.get('/:id', 
  studentAwardsController.getStudentAwardById
);

router.put('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  studentAwardsController.updateStudentAward
);

router.delete('/:id', 
  roleBasedAccess(['admin']), 
  studentAwardsController.deleteStudentAward
);

module.exports = router;
