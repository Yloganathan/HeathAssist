const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_assist';
const promise = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: promise
});
var db = pgp(connectionString);

// generic way to skip NULL/undefined values for strings:
function str(column) {
    return {
        name: column,
        skip: c => !c.exists || c.value === null || c.value === undefined
    };
}

// generic way to skip NULL/undefined values for integers,
// while parsing the type correctly:
function int(column) {
    return {
        name: column,
        skip: c => !c.exists || c.value === null || c.value === undefined,
        init: c => +c.value
    };
}

var logFields = new pgp.helpers.ColumnSet([

        str('date'),
        str('time'),
        int('weight'),
        int('fatpercent'),
        str('dietnotes'),
        str('workoutnotes')
    ], {table: 'daily_log'}
);

//TODO: date support -created/updated/date field
//TODO: avoid duplicate entries
//TODO: support per user
function retrieveLogsforUser(req, res, next) {

    db
        .any('select * from daily_log')
        .then(function (data) {
            res.status(200)
               .json({
                   status: 'success',
                   data: data,
                   message: 'Retrieved ALL logs'
               });
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}

//TODO: support per user
function addLogforUser(req, res, next) {
  //  var insert = pgp.helpers.insert(req.body, logFields);
    const data = {
        date: req.body.date,
        time: req.body.time || null,
        weight: req.body.weight || null,
        fatpercent: req.body.fatpercent || null,
        dietnotes: req.body.dietnotes || null,
        workoutnotes: req.body.workoutnotes || null
    };

    db
        .none('INSERT INTO daily_log(date,time,weight,fatpercent,dietnotes,workoutnotes) values($1, $2, $3, $4, $5, $6)',
            [data.date, data.time, data.weight, data.fatpercent, data.dietnotes, data.workoutnotes])
        .then(function(){
            res.status(200)
               .json({
                   status: 'success',
                   message: 'created log'
               });
        })
        .catch(function(err){
            return next(err);
        })
    ;
}

function updateLogbyId(req, res, next) {
    var update = pgp.helpers.update(req.body, logFields) + ' WHERE id = ' +
        parseInt(req.params.id);

    db
        .result(update)
        .then(function(){
            res.status(200)
               .json({
                   status: 'success',
                   message: 'updated log' + req.params.id
               });
        })
        .catch(function(err){
            return next(err);
        })
    ;
}

function deleteLogbyId(req, res, next) {

    var id = parseInt(req.params.id);
    db
        .result('DELETE  from daily_log where id = $1',id)
        .then(function () {
            res.status(200)
               .json({
                   status: 'success',
                   message: 'Deleted one log ' + id
               });
        })
        .catch(function (err) {
            return next(err);
        })
    ;
}



module.exports = {
    retrieveLogsforUser: retrieveLogsforUser,
    addLogforUser: addLogforUser,
    updateLogbyId: updateLogbyId,
    deleteLogbyId: deleteLogbyId
};