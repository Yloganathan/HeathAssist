const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_assist';
const promise = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: promise
});
const db = pgp(connectionString);

function retrieveUsers(req, res, next) {

    db
        .any('select * from user_table')
        .then(function (data) {
            res.status(200)
               .json({
                 status: 'success',
                 data: data,
                 message: 'Retrieved ALL users'
               });
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}

function getUser(req, res, next) {

    var id = parseInt(req.params.id);
    db
        .any('select * from user_table where id = $1',id)
        .then(function (data) {
            res.status(200)
               .json({
                 status: 'success',
                 data: data,
                 message: 'Retrieved one user' + id
               });
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}

function createUser(req, res, next) {

    const data = {name: req.body.name, email: req.body.email};
    db
        .result('SELECT * FROM user_table WHERE email = $1',data.email)
        .then(function(result){
            console.log(result);
            if(result.rowCount == 0) {
                db
                    .none('INSERT INTO user_table(name, email) values($1, $2)',
                        [data.name, data.email])
                    .then(function () {
                        res.status(200)
                           .json({
                               status : 'success',
                               message: 'created user'
                           });
                    })
                    .catch(function (err) {
                        return next(err);
                    })
                ;
            }
            else {
                res.status(200)
                   .json({
                       status : 'success',
                       message: 'existing user'
                   });
            }
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}

function updateUser(req, res, next) {

    const data = {id: req.body.id, name: req.body.name, email: req.body.email};

    db
        .none('UPDATE user_table SET name=$1, email=$2 WHERE id=$3',
            [data.name, data.email, data.id])
        .then(function(){
            res.status(200)
               .json({
                   status: 'success',
                   message: 'updated user' + data.id
               });
        })
        .catch(function(err){
            return next(err);
        })
    ;
}

function deleteUser(req, res, next) {

    var id = parseInt(req.params.id);
    db
        .result('DELETE  from user_table where id = $1',id)
        .then(function () {
            res.status(200)
               .json({
                   status: 'success',
                   message: 'Deleted one user ' + id
               });
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}


module.exports = {
    retrieveUsers: retrieveUsers,
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};