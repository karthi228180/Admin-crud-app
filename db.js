require ('dotenv').config();
const mongoose = require('mongoose');
module.exports =() => {
    return mongoose
    .connect (process.env.MONGODB_URL)
    .then(
        () =>
            console.log("connected to db")
    )
    .catch(
        (err) =>{
            console.error('could not connect to database');
            throw err
        }
    );
};