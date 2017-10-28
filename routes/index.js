var express = require('express');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/suggestedSearch', function(req, response){

    let apiKey = 'frXv9fqR24i3FbjXKFbnULOecCoDGMC78ZHvHjmC';
    let url = 'https://api.nal.usda.gov/ndb/search/?';
    let maxRows = 10;
    let searchKey = req.body.key;
    let properties = {format: 'json', q:searchKey, max:maxRows, api_key: apiKey};
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
});
module.exports = router;
