'use strict';

const express = require('express');
const app = express();
let urls = [];

app.get('/', (req, res) => res.send('hello world'));
app.get('/api/min/:url', (req, res) => {
    let url = decodeURI(req.params.url);
    let i = urls.indexOf(url);
    if (i === -1) {
        i = urls.push(url) - 1;
    }
    res.send(new Buffer(`${i}`).toString('base64'));
});
app.get('/api/demin/:b64', (req, res) => {
    let b64 = req.params.b64;
    let i = Number(new Buffer(b64, 'base64').toString('ascii'));
    if (i && urls[i]) {
        res.send(urls[i]);
    } else {
        res.send(-1);
    }
});
app.listen(3000, () => console.log("api running at http://localhost:3000/api"));