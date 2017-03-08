const express = require('express');
const router = express.Router();
const userAPI = require('../server/api/user-api');

/* GET home page. */
router.get('/', userAPI.retrieveUsers);

module.exports = router;
