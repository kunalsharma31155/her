const mongooose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongooose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        maxlength: 255,
        required: true,
        unique: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    phoneNo : {
        type : String,
        required: true
    },
    userLoginId : {
        type : String,
        unique: true,
    },
    password : {
        type : String,
        minlength: 7,
        required: true,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String,
    },
    activeStatus:{
        type:Boolean,
        default:true,
        required: true,
    }
},
{
    timestamps: true
})


// hashing the password
saltSecret:String;
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(this.password, salt, (err,hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
})

const User = mongooose.model('User',userSchema);
