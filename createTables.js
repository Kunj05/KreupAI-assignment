// createTables.js
const { createBehavioralRecordsTable } = require('./models/behavioralRecords');
const { createExtracurricularActivitiesTable } = require('./models/extracurricularActivities');
const { createStudentAwardsTable } = require('./models/studentAwards');
const { createClassSectionTable } = require('./models/classSection');
const { createTermDetailsTable } = require('./models/termDetails');

const createTables = async () => {
  await createBehavioralRecordsTable();
  await createExtracurricularActivitiesTable();
  await createStudentAwardsTable();
  await createClassSectionTable();
  await createTermDetailsTable();
};

createTables();
