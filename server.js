const express = require('express');
const app = express();
const path = require('path');
const csp = require('helmet-csp')

// require('./config/config');
require('./startup/prod') (app);
require('./models/db');

require('./startup/routes') (app);
app.use(express.static(path.join(__dirname, '/client')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client', 'index.html'))
})

  app.use(csp({
    directives: {
      defaultSrc: ["'self'",'https://bet-devv.herokuapp.com']
    }
  }))
  app.Use(async (ctx, next) =>
        {
            ctx.Response.Headers.Add("Content-Security-Policy",
            "default-src 'self'; script-src 'self' https://bet-devv.herokuapp.com; " +
            "style-src 'self' https://maxcdn.bootstrapcdn.com" );
            await next();
        });
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