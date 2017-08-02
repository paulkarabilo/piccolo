'use strict';

const express = require('express');
const app = express();
const redis = require('redis');
const { convert, unconvert } = require('./converter');
const client = redis.createClient({host: 'db', port: 6379});

let cache = {};


app.get('/api', (req, res) => res.send('api ok'));

app.get('/api/min/:url', (req, res) => {
    let url = decodeURI(req.params.url);
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

app.get('/api/demin/:cid', (req, res) => {
    client.get(`urls:${req.params.cid}`, (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send('ERROR: Could not fetch URL from DB');
        }
        res.status(200).send(url);
    });
});

app.listen(3000, '0.0.0.0', () => console.log("api running at http://localhost:3000/api"));