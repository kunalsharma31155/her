require('express-async-errors');
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
var path = require( "path" );

const error = require('../middleware/error');
const user = require('../api/user.router');



module.exports = function(app){
    app.use(bodyParser.urlencoded({
        extended: true,limit: '25mb',parameterLimit:50000
    }));
    app.use(bodyParser.json({limit: '25mb'}));
    app.use(cors());
    app.use('/user', user);
    app.use(error);
}