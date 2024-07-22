const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    middleName:{
        type:String,
    },
    lastname: {
        type: String,
        required:true,
    },
    key: {
        type: String,
        unique: true,
        required:true,
    },
    mobile:{
        type:Number,
        unique:true,
		maxlength :10,
        required:true,
    },
    password: {
        type: String,
        required:true,

    },
},
{
    timestamps: true,
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  
module.exports = mongoose.model("Admin", adminSchema);