const User  = require('../Models/Addmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const user_login = async (req, res , next) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    let existingUser;

    try{
        existingUser = await User.findOne({Email: Email});
    } catch(error){
        return new Error(error);
    }
    if(!existingUser){
        return res.status(400).json({message: "user not found "})
    }
    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:'24h'
    });

    console.log("Generated Token", token);
    return res
    .status(200)
    .json({message: "Successfully Logged In", user:existingUser, token})
};


module.exports = {
    user_login
}