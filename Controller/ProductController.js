// const Designation = require('../Models/Designationmodel')
// const Developer = require('../Models/Developersmodel')
// const UIUX = require('../Models/UIUXmodel')
// const Testing = require('../Models/Testingmodel')
// const Others = require('../Models/othersmodel')
// const User = require('../Models/Usermodel')


// const product_add = async(req, res) => {
//     try{
//         const {username, password, designation} = req.body;
//         const existingproduct = await User.findOne({username});
//         if(existingproduct){
//             return res.status(400).json({ error: 'User already exists'})
//         }
//         const designationdoc = await Designation.findOne({name: designation});
//         if(!designationdoc){
//             return res.status(400).json({ error : 'Designation not found'});
//         }
//         let user;
//         switch (designation){
//             case 'Developer':
//                 user = new Developer({username, password});
//                 break;
//             case 'UIUX Design':
//                 user = new UIUX({username, password});
//                 break;
//             case 'Testing':
//                 user = new Testing({username, password});
//                 break;
//             default:
//                 user = new Others({username, password}); 
//         }
//         await user.save();
//         res.json({ message : "User add successfully"})
//     } catch(err){
//         console.error(err);
//         res.status(500).json({ error : "Server error"})
//     }
// };

// module.exports = {
//     product_add
// }