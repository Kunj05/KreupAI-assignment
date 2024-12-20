const express = require('express');
const router = express.Router();
const extracurricularActivitiesController = require('../controllers/extracurricularActivitiesController');
const roleBasedAccess = require('../middleware/roleBasedAccess');

router.get('/', 
  extracurricularActivitiesController.getAllExtracurricularActivities
);

router.post('/create', 
  roleBasedAccess(['admin', 'teacher']), 
  extracurricularActivitiesController.createExtracurricularActivity
);

router.get('/:id', 
  extracurricularActivitiesController.getExtracurricularActivityById
);

router.put('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  extracurricularActivitiesController.updateExtracurricularActivity
);

router.delete('/:id', 
  roleBasedAccess(['admin', 'teacher']), 
  extracurricularActivitiesController.deleteExtracurricularActivity
);

module.exports = router;
