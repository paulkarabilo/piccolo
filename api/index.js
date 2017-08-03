'use strict';

const express = require('express');
const app = express();
const redis = require('redis');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const { convert, unconvert } = require('./converter');
const client = redis.createClient({host: 'db', port: 6379});



let cache = {};


app.get('/api', (req, res) => res.send('api ok'));

app.post('/api/min/', (req, res) => {
    let url = decodeURI(req.body.url);
    if (cache[url]) {
        return res.status(200).send(cache[url]);
    }
    client.incr('current_url_id', (err, id) => {
        let cid = convert(id);
        if (err) {
            console.error(err);
            return res.status(500).send('ERROR: Could not increment ID');
        }
        client.set(`urls:${cid}`, url, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('ERROR: Could not write URL to DB');
            }
            cache[url] = cid;
            res.status(200).send(cid);
        });
    });
});

app.post('/api/demin/', (req, res) => {
    client.get(`urls:${req.body.cid}`, (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send('ERROR: Could not fetch URL from DB');
        }
        res.status(200).send(url);
    });
});

app.listen(3000, '0.0.0.0', () => console.log("api running at http://localhost:3000/api"));