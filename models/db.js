const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://engagement:Mongodb@123@cluster0.r17es.mongodb.net/bet?retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true } ,
    (err) => {
    if(!err) { console.log('Mongo DB connected succeeded'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined , 2)); }
});