const express = require('express');
const logs = express.Router();
const logAPI = require('../server/api/dailylog-api');

/* GET logs for a user */
logs.get('/api/v1/logs/:userid', logAPI.retrieveLogsforUser);

/* CREATE log entry for user */
logs.post('/api/v1/log/:userid', logAPI.addLogforUser);

/* UPDATE log entry */
logs.put('/api/v1/log/update/:id', logAPI.updateLogbyId);

/* DELETE log entry */
logs.delete('/api/v1/log/:id', logAPI.deleteLogbyId);

module.exports = logs;
