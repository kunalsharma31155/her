const express = require('express');
const app = express();
const path = require('path');
const csp = require('helmet-csp')

// require('./config/config');
require('./startup/prod') (app);
require('./models/db');
app.use(requireHTTPS);
require('./startup/routes') (app);
app.use(express.static(path.join(__dirname, '/client')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', 'index.html'))
})
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
var PORT = process.env.PORT || 5000;
var serverhost = process.env.YOUR_HOST || '0.0.0.0';

app.listen( PORT,err=>{
    if(err){console.log(err);}
    console.log(`Server Started On Portt : ${process.env.PORT}`);
}) 
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://engagement:Mongodb@123@cluster0.r17es.mongodb.net/bet?retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true } ,
    (err) => {
    if(!err) { console.log('Mongo DB connected succeeded'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined , 2)); }
});