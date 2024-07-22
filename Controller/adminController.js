const Admin = require('../Models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


let adminCreated = false;
const adminpost = async (req, res)=>{
    const adminCreated = [
        { firstName:"karthik",middleName:"C",lastname:"L",key:"karthik@gmail.com", mobile:"123456789",password:bcrypt.hashSync("123456789")}
    ];

    try{
        const existingAdmin = await Admin.findOne({key:'karthik@gmail.com'});

        if(!existingAdmin) {
            const createdAdmin = await Admin.create(adminCreated);
            console.log('DefaultAdmin created:', createdAdmin);
        } else {
            console.log("Admin already created");
          }
    }catch (error) {
        console.error('Error creating default Admin:', error);
      }
}

const signup = async (req, res, next) => {
    
    const  firstName = req.body.firstName;
    const  lastname = req.body.firstName;
    const key =  req.body.key;
    const password =  req.body.password;
  console.log(firstName);
  console.log(lastname);
  console.log(key);
  console.log(password);
  let existingUser;
  try{
    existingUser = await Admin.findOne({key:key});
  } catch (err) {
    console.log(err);
    console.log('find ERROR')
  }
  if(existingUser) {
    return res
    .status(400)
    .json({ message: "Admin already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const admin = new Admin({
    firstName,
    lastname,
    key,
    password:hashedPassword,
  });

  try{
    await admin.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error signup" });
  }
  
  return res.status(201).json({ message: admin });
};


const login = async (req, res, next) => {
    const key = req.body.key;
    const password = req.body.password;

    let existingUser;

    try{
        existingUser = await Admin.findOne({key: key});
    } catch (err) {
        return new Error(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found. Please Signup or create new account...-" })
    }
    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:'24h'
    });

    console.log("Generated Token", token);

    return res
    .status(200)
    .json({ message: "Successfully Logged In", admin:existingUser, token})
};


const logout = (req, res, next) => {
   res.clearCookie('jwt');
   res.status(200).json({message: 'Logged out successfully'  })
};

// const verifyToken = (req, res, next) => {
//     const cookies = req.headers.cookie;
//     const token = cookies.split("=")[1];

//     if (!token) {
//         res.status(404).json({ message: "No token found" });
//       }
//       jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, admin) => {
//         if (err) {
          
//           return res.status(400).json({ message: "Invalid TOken" });
//         }
//           console.log(admin.id);
//           req.id = admin.id;
//         });
//         next();
//       };

//       const logout = (req, res, next) => {
//         const cookies = req.headers.cookie;
//         const prevToken = cookies?.split("=")[1];
//         if (!prevToken) {
//             return res.status(400).json({ message: "Couldn't find token" });
//           }
//           jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
//             if (err) {
//               console.log(err);
//               return res.status(403).json({ message: "Authentication failed" });
//             }
//             res.clearCookie(`${user.id}`);
//             req.cookies[`${user.id}`] = "";
//             return res.status(200).json({ message: "Successfully Logged Out" });
//           });

//       }
    


module.exports = {
    adminpost,
    signup,
    login,
    logout,
    // verifyToken
}

