var db = require('./pghelper'),
    winston = require('winston');

/**
 * Get a list of stores
 * @param req
 * @param res
 * @param next
 */
function findAll(req, res, next) {
    db.query("SELECT id, name, location__latitude__s AS latitude, location__longitude__s AS longitude FROM salesforce.hotel__c ORDER BY name")
        .then(function (hotels) {
            return res.send(JSON.stringify(hotels));
        })
        .catch(next);
};

exports.findAll = findAll;
