const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_assist';
var promise = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: promise
});
var db = pgp(connectionString);

function retrieveUsers(req, res, next) {
   /* const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM user_table ORDER BY ID ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });*/
    db.any('select * from user_table')
      .then(function (data) {
          res.status(200)
             .json({
                 status: 'success',
                 data: data,
                 message: 'Retrieved ALL puppies'
             });
      })
      .catch(function (err) {
          return next(err);
      });
}

function createUser(req, res, next) {
    const results = [];
    // Grab data from http request
    const data = {name: req.body.name, email: req.body.email};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO user_table(name, email) values($1, $2)',
            [data.name, data.email]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM user_table ORDER BY ID ASC');
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
}



module.exports = {
    retrieveUsers: retrieveUsers,
    createUser: createUser
};