const express = require('express');
const user = express.Router();
const userAPI = require('../server/api/user-api');

/* GET users */
user.get('/api/v1/users', userAPI.retrieveUsers);

/* GET one user */
user.get('/api/v1/users/:id', userAPI.getUser);

/* CREATE user */
user.post('/api/v1/users', userAPI.createUser);

/* UPDATE user */
user.put('/api/v1/users/:id', userAPI.updateUser);

/* DELETE user */
user.delete('/api/v1/users/:id', userAPI.deleteUser);

module.exports = user;
