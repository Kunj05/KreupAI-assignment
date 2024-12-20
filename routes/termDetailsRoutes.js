const express = require('express');
const router = express.Router();
const termDetailsController = require('../controllers/termDetailsController');
const roleBasedAccess = require('../middleware/roleBasedAccess');

router.post('/create', 
  roleBasedAccess(['admin', 'teacher']), 
  termDetailsController.createTermDetail
);

router.get('/', 
  termDetailsController.getAllTermDetails
);

router.get('/:id', 
  termDetailsController.getTermDetailById
);

router.put('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  termDetailsController.updateTermDetail
);

router.delete('/:id', 
  roleBasedAccess(['admin']), 
  termDetailsController.deleteTermDetail
);

module.exports = router;
