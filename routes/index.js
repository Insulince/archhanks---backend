var express = require('express');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var router = express.Router();
let apiKey = 'frXv9fqR24i3FbjXKFbnULOecCoDGMC78ZHvHjmC';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

function sendData(url, properties, response){
    let query =  querystring.stringify(properties);
    let path = url + query;
    https.get(path, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            response.status(200).send(body);
        });
    });
}

router.post('/suggestedSearch', function(req, response){
    let url = 'https://api.nal.usda.gov/ndb/search/?';
    let maxRows = 10;
    let searchKey = req.body.key;
    let properties = {format: 'json', q:searchKey, max:maxRows, api_key: apiKey};
    sendData(url, properties, response);
});

router.post('/nutrition', function(req, response){
    let url = 'https://api.nal.usda.gov/ndb/V2/reports?';
    let searchKey = req.body.key;
    let properties = {format: 'json', ndbno:searchKey, api_key: apiKey};
    sendData(url, properties, response);
});
module.exports = router;
