require('express-async-errors');
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
var path = require( "path" );
const helmet = require('helmet');
const error = require('../middleware/error');
const user = require('../api/user.router');



module.exports = function(app){
    app.use(helmet());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/user', user);
    app.use(error);
}