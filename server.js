const express = require('express');
const app = express();
const path = require('path');
require('./config/config');
require('./startup/prod') (app);
require('./models/db');

require('./startup/routes') (app);
app.use(express.static(path.join(__dirname, 'client')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
})
var PORT = process.env.PORT || 5000;
var serverhost = process.env.YOUR_HOST || '0.0.0.0';

app.listen( PORT,err=>{
    if(err){console.log(err);}
    console.log(`Server Started On Portt : ${process.env.PORT}`);
}) 