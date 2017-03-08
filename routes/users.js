const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';


/* GET users */
router.get('/api/v1/users', function(req, res, next) {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM items ORDER BY id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
        return res.json(results);
        });
    });
});

/* GET one user */
router.get('/api/v1/users/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* CREATE user */
router.post('/api/v1/users', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
