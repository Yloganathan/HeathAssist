const express = require('express');
const router = express.Router();
const logAPI = require('../api/dailylog-api');
const userAPI = require('../api/user-api');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(
        __dirname, '..', '..', 'client', 'history', 'index.html'));
});

//User CURD operations//

/* GET users */
router.get('/api/v1/users', userAPI.retrieveUsers);

/* GET one user */
router.get('/api/v1/users/:id', userAPI.getUser);

/* CREATE user */
router.post('/api/v1/users', userAPI.createUser);

/* UPDATE user */
router.put('/api/v1/users/:id', userAPI.updateUser);

/* DELETE user */
router.delete('/api/v1/users/:id', userAPI.deleteUser);


//Daily log CURD operation

/* GET logs for a user */
router.get('/api/v1/logs/:userid', logAPI.retrieveLogsforUser);

/* CREATE log entry for user */
router.post('/api/v1/log/:userid', logAPI.addLogforUser);

/* UPDATE log entry */
router.put('/api/v1/log/update/:id', logAPI.updateLogbyId);

/* DELETE log entry */
router.delete('/api/v1/log/:id', logAPI.deleteLogbyId);

module.exports = router;
