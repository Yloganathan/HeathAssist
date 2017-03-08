const express = require('express');
const router = express.Router();
const userAPI = require('../server/api/user-api');

/* GET users */
router.get('/api/v1/users', userAPI.retrieveUsers);

/* GET one user */
//router.get('/api/v1/users/:id', userAPI.getUser);

/* CREATE user */
router.post('/api/v1/users', userAPI.createUser);

/* UPDATE user */
//router.put('/api/v1/users', userAPI.updateUser);

/* DELETE user */
//router.delete('/api/v1/users', userAPI.deleteUser);

module.exports = router;
