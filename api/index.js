const express = require('express');
const app = express();
console.log("HI_");
app.get('/', (req, res) => res.send('hello world'));
app.listen(3000);