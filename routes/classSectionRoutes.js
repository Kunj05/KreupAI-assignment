const express = require('express');
const router = express.Router();
const classSectionController = require('../controllers/classSectionController');
const roleBasedAccess = require('../middleware/roleBasedAccess');

router.post('/create', 
  roleBasedAccess(['admin', 'teacher']), 
  classSectionController.createClassSection
);

router.get('/', 
  classSectionController.getAllClassSections
);

router.get('/:id', 
  classSectionController.getClassSectionById
);

router.put('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  classSectionController.updateClassSection
);

router.delete('/:id', 
  roleBasedAccess(['admin']), 
  classSectionController.deleteClassSection
);

module.exports = router;
