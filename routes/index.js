let express = require('express');
let https = require('https');
let querystring = require('querystring');
let router = express.Router();
let apiKey = 'frXv9fqR24i3FbjXKFbnULOecCoDGMC78ZHvHjmC';

router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.post('/suggestedSearch', (req, response) => {
    let url = 'https://api.nal.usda.gov/ndb/search/?';
    let maxRows = 10;
    let searchKey = req.body.key;
    let properties = {format: 'json', q: searchKey, max: maxRows, api_key: apiKey};
    sendData(url, properties, response);
});

router.post('/nutrition', (req, response) => {
    let url = 'https://api.nal.usda.gov/ndb/V2/reports?';
    let searchKey = req.body.key;
    let properties = {format: 'json', ndbno: searchKey, api_key: apiKey};
    sendData(url, properties, response);
});

function sendData(url, properties, response) {
    let query = querystring.stringify(properties);
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

module.exports = router;
