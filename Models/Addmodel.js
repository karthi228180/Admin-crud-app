const mongoose = require('mongoose')

const AdduserSchema = new mongoose.Schema({
    Name: {
        type:String
    },
    Email: {
        type:String
    },
    // Password: {
    //     type:String,
    //     required:true
    // },
    Designation: {
        type:String
    },
    Gender : {
        type:String,
    },
    Mobilenumber: {
        type:String
    },
    Course:{
        type:String,
    },
    Starting_date: {
        type:String
    },
    RegisterPhoto:{
        data:{
            type:Buffer,
        },
        contentType:{
            type:String,
        },
        path:{
            type:String,
        },
    },

},{
    timestamps: true,
});

module.exports = mongoose.model("AddUser", AdduserSchema);