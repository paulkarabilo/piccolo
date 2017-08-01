'use strict';

const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient({host: 'db', port: 6379});

const SYM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-'.split('');
const BASE = SYM.length;

let cache = {};

let convert = (n) => n ? SYM[n % BASE] + convert(Math.floor(n / BASE)) : '';
//let unconvert = (s, p = 0) => s && s.length ? unconvert(s.substr(1), p + 1) + SYM.indexOf(s[0]) * Math.pow(BASE, p) : 0

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