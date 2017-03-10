const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/health_assist';
const promise = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: promise
});
const db = pgp(connectionString);

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

const logFields = new pgp.helpers.ColumnSet([

        str('date'),
        str('time'),
        int('weight'),
        int('fatpercent'),
        str('dietnotes'),
        str('workoutnotes')
    ], {table: 'daily_log'}
);

//TODO: date support -created/updated/date field

function retrieveLogsforUser(req, res, next) {

    db
        //.any('select * from daily_log')
        .any('SELECT daily_log.* FROM user_log INNER JOIN daily_log ON (daily_log.id = user_log.dailylog) WHERE user_log.userId = $1', parseInt(req.params.userid))
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
// TODO: Cordova
// TODO: Need to save time
// TODO: check if the user exists before inserting the foreign key
// TODO: avoid duplicate entries
// TODO: update time
// TODO: error handling
// TODO: Diagnostics
// TODO: Make it DRY, abstract sql
// TODO: delete is not working
function addLogforUser(req, res, next) {
    const userid = parseInt(req.params.userid);
 console.log(userid);
 console.log(req.body);
    const data = {
        date: req.body.date,
        weight: req.body.weight || null,
        fatpercent: req.body.fatpercent || null,
        dietnotes: req.body.dietnotes || null,
        workoutnotes: req.body.workoutnotes || null
    };

    db
        .one('INSERT INTO daily_log(date,weight,fatpercent,dietnotes,workoutnotes) values($1, $2, $3, $4, $5) RETURNING id',
            [data.date, data.weight, data.fatpercent, data.dietnotes, data.workoutnotes])

        .then(function(result){
            console.log('inserted one'+ result.id);

            db
                .none('INSERT INTO user_log(userid, dailylog) values($1, $2)',[userid,result.id])
                .then(function(){
                    console.log('insert to userlog'+ userid);
                    res.status(200)
                    .json({
                        status: 'success',
                        message: 'created log'
                    });
                })
                .catch(function(err){
                    console.log('errr' + err);
                   return next(err);
                })
            ;
        })
        .catch(function(err){
            console.log('errr' + err);
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
        .result('DELETE from user_log WHERE dailylog = $1',id)
        .then(function () {
            console.log('Delete daily log');
            db
                .result('DELETE  from daily_log where id = $1',id)
                .then(function(){
                    console.log('Delete user log');
                    res.status(200)
                   .json({
                       status : 'success',
                       message: 'Deleted one log ' + id
                   });
                })
                .catch(function(err){
                    return next(err);
            })
            ;
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